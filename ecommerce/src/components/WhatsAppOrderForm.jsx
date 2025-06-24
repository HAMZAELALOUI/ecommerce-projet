import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const WhatsAppOrderForm = ({ cart, total, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateWhatsAppMessage = () => {
    let message = "🛒 *Nouvelle Commande FreshMarket*\n\n"
    message += `👤 *Client:* ${formData.name}\n`
    message += `📍 *Adresse:* ${formData.address}\n\n`
    message += "*🛍️ Achats :*\n"
    cart.forEach(item => {
      message += `- ${item.name} x${item.quantity}\n`
    })
    message += `\n💰 *Total: ${total} MAD*\n\n`
    if (formData.notes) {
      message += `📝 *Notes:* ${formData.notes}\n\n`
    }
    return encodeURIComponent(message)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.address) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }
    
    const phoneNumber = "212600000000" // Remplacer par le vrai numéro
    const message = generateWhatsAppMessage()
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-all duration-300 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                    Finaliser la Commande
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription>
                  Remplissez vos informations pour passer commande via WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Adresse de livraison *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Votre adresse complète"
                      required
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Notes (optionnel)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Instructions spéciales, étage, code d'accès..."
                      rows={2}
                    />
                  </div>

                  {/* Résumé de la commande */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Résumé de la commande</h4>
                    <div className="space-y-1 text-sm">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.name} x{item.quantity}</span>
                          <span>{item.price * item.quantity} MAD</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-green-600">{total} MAD</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Envoyer la Commande via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default WhatsAppOrderForm

