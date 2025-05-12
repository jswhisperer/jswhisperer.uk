import { Bonjour } from 'bonjour-service'

const instance = new Bonjour()

// advertise an HTTP server on port 3000
instance.publish({ name: 'My Web Server', type: 'http', port: 3090, protocol: "tcp" })

// browse for all http services
instance.find({ type: 'http' }, function (service) {
  console.log('Found an HTTP server:', service)
})