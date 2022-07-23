

//remitente debe ser el mismo registrado en twilio
const validoTextoPlano = {
    to: 'eliseoabelcarh1@gmail.com', // Change to your recipient
    from: 'eliseoabelcarh2@gmail.com',
    subject: 'Enviadooo desde Modulo Email Sender Texto plano',
    text: 'easy to do anywhere, even with Node.js'
}
const validoTextoPlanoYHtml = {
    to: 'eliseoabelcarh1@gmail.com', // Change to your recipient
    from: 'eliseoabelcarh2@gmail.com',
    subject: 'Enviadooo desde Modulo Email Sender texto plano y html',
    text: 'easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

const validoTextoPlanoYHtmlYAttachmentVacio = {

    to: 'eliseoabelcarh1@gmail.com', // Change to your recipient
    from: 'eliseoabelcarh2@gmail.com',
    subject: 'Enviadooo desde Modulo Email Sender Con AdjuntoVacio',
    text: 'easy to do anywhere, even with Node.js',
    html: '<strong>Bestt anywhere, even with Node.js</strong>',
    attachments: []
}




const sinSender = {
    to: 'some1@gmail.com',
    subject: 'Asunto Some',
    text: 'texto plano del mensaje'
}
const sinRecipient = {
    from: 'some@gmail.com',
    subject: 'Asunto Some',
    text: 'texto plano del mensaje'
}
const sinSubject = {
    to: 'some1@gmail.com',
    from: 'some@gmail.com',
    text: 'texto plano del mensaje'
}
const sinMessage = {
    to: 'some1@gmail.com',
    from: 'some@gmail.com',
    subject: 'Asunto Some',
}
const sinHtml = {
    to: 'some1@gmail.com',
    from: 'some@gmail.com',
    subject: 'Asunto Some',
    text: 'texto plano del mensaje'
}
const sinAttachment = {
    to: 'some1@gmail.com',
    from: 'some@gmail.com',
    subject: 'Asunto Some',
    text: 'texto plano del mensaje',
    html: '<strong>and easy</strong>',
}


const sinNingunFileObject = {

    to: 'eliseoabelcarh1@gmail.com',
    from: 'eliseoabelcarh2@gmail.com',
    subject: 'Enviadoww desde Moduloooo',
    text: 'easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    attachments: []
}

const objetoFileValido = {
    content: 'somethingInFileFormat',
    filename: 'ejemplo.pdf',
    type: 'application/pdf',
    disposition: 'attachment'
}
const objetoFileSinContent = {
    filename: 'ejemplo.pdf',
    type: 'application/pdf',
    disposition: 'attachment'
}
const objetoFileSinFilename = {
    content: 'somethingInFileFormat',
    type: 'application/pdf',
    disposition: 'attachment'
}
const objetoFileSinType = {
    content: 'somethingInFileFormat',
    filename: 'ejemplo.pdf',
    disposition: 'attachment'
}
const objetoFileSinDisposition = {
    content: 'somethingInFileFormat',
    filename: 'ejemplo.pdf',
    type: 'application/pdf'
}


module.exports = {
    sinSender,
    sinRecipient,
    sinSubject,
    sinMessage,
    sinHtml,
    sinAttachment,
    validoTextoPlano,
    validoTextoPlanoYHtml,
    validoTextoPlanoYHtmlYAttachmentVacio,
    sinNingunFileObject,
    objetoFileValido,
    objetoFileSinContent,
    objetoFileSinFilename,
    objetoFileSinType,
    objetoFileSinDisposition
}