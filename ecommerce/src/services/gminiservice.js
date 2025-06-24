// Service Gemini pour le chatbot FreshMarket
// Utilise l'API Gemini 2.0 Flash pour des réponses intelligentes

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-api-key-here'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

// Nouveau prompt multilingue
const SYSTEM_PROMPT = `Tu es l'assistant FreshMarket, expert amical en produits alimentaires frais et desserts marocains.

Règles :
1. Réponds TOUJOURS dans la langue du client (détecte automatiquement la langue de la question : français, anglais, arabe, etc.).
2. Tes réponses doivent être brèves (1 à 3 phrases maximum), amicales, et professionnelles.
3. Tu peux utiliser des emojis pour rendre la conversation chaleureuse.
4. Tu réponds uniquement aux questions concernant :
   - Les produits FreshMarket (fruits, légumes, desserts marocains)
   - Les commandes, livraison, paiement, horaires, contact, prix, promotions
5. Si la question n'est PAS liée à FreshMarket, réponds poliment que tu ne peux répondre qu'aux questions sur FreshMarket et ses produits.
6. Pour les salutations (bonjour, hi, hello, salam, ...), réponds de façon chaleureuse et invite le client à poser sa question sur les produits ou services.
7. Ne donne jamais de réponses techniques, informatiques, ou personnelles.
8. Ne donne jamais de réponses statiques ou génériques, adapte toujours ta réponse à la question du client.

Exemples :
- Si le client écrit en anglais, tu réponds en anglais.
- Si le client écrit en arabe, tu réponds en arabe.
- Si le client écrit en français, tu réponds en français.

Si la question n'est PAS liée à FreshMarket, réponds simplement (dans la langue du client) : "Je ne peux répondre qu'aux questions concernant FreshMarket et nos produits. Comment puis-je vous aider avec nos fruits, légumes ou desserts ?"
`

// Fonction pour appeler l'API Gemini
export const generateResponse = async (userMessage, conversationHistory = []) => {
  try {
    // Préparer l'historique de conversation
    const conversationContext = conversationHistory
      .map(msg => `${msg.type === 'user' ? 'Client' : 'Assistant'}: ${msg.text}`)
      .join('\n')

    // Construire le prompt complet
    const fullPrompt = `${SYSTEM_PROMPT}

Historique de la conversation :
${conversationContext}

Message actuel du client : ${userMessage}

Réponse de l'assistant FreshMarket :`

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text.trim()
    } else {
      throw new Error('Réponse invalide de l\'API')
    }

  } catch (error) {
    console.error('Erreur Gemini API:', error)
    
    // Réponses de fallback en cas d'erreur
    const fallbackResponses = [
      "Désolé, je rencontre un problème technique. Pour une assistance immédiate, contactez-nous au +212 6 00 00 00 00.",
      "Je ne peux pas répondre pour le moment. N'hésitez pas à nous appeler directement pour vos questions.",
      "Problème de connexion. Contactez-nous par WhatsApp pour une réponse rapide."
    ]
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }
}

// (Aucune autre fonction exportée)
