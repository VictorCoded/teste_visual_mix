import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongoURL = process.env.MONGODB_URL || 'mongodb+srv://vhenriquecarvalho10:GMx1fdWohQxo2DJD@adega.ogcyd9c.mongodb.net/adega?retryWrites=true&w=majority&appName=adega'

// Configurações do Mongoose
mongoose.set('strictQuery', true)

// Conecta com opções recomendadas
mongoose.connect(mongoURL)
  .then(() => {
    console.log('✅ Conexão com o MongoDB estabelecida com sucesso')
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar com o MongoDB:', error)
    process.exit(1) // Encerra a aplicação em caso de erro de conexão
  })

// Eventos de conexão
mongoose.connection.on('error', (error) => {
  console.error('❌ Erro na conexão com o MongoDB:', error)
})

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Desconectado do MongoDB')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('✅ Conexão com o MongoDB fechada')
  process.exit(0)
})

export default mongoose