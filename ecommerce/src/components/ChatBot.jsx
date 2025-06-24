import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateResponse } from '@/services/gminiservice.js'

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '👋 Bonjour ! Je suis ravi de vous accueillir chez FreshMarket ! Comment puis-je vous aider avec nos délicieux produits frais ?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  // Scroll automatique vers le bas à chaque nouveau message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Toutes les questions passent par Gemini
      const currentMessages = [...messages, userMessage]
      const response = await generateResponse(inputMessage, currentMessages)
      
      const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
        text: response,
      timestamp: new Date()
    }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Erreur lors de la génération de réponse:', error)
      
      // Réponse de fallback
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: 'Désolé, je rencontre un problème technique. Pour une assistance immédiate, contactez-nous au +212 6 00 00 00 00 ou via WhatsApp.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 60 }}
          className="fixed right-6 bottom-[88px] w-80 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl z-50 border"
        >
          <Card className="h-[500px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-lg">
                <Bot className="w-5 h-5 mr-2" />
                Assistant FreshMarket
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-blue-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 bg-white"
                style={{ minHeight: 0, maxHeight: '340px', wordBreak: 'break-word' }}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-green-100' : 'bg-blue-100'}`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-green-600" />
                        ) : (
                          <Bot className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${message.type === 'user' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800'} break-words`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        <p className="text-sm whitespace-pre-wrap break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{message.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {/* Indicateur de chargement */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="rounded-lg p-3 bg-gray-100">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                          <span className="text-sm text-gray-600">En train d'écrire...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tapez votre message..."
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                    <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ChatBot

