const router = require("express").Router();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path")


function docsHandler() {

    const swaggerSpec = {
        definition:{
          openapi:"3.0.0",
          info: {
            title:"Disney Alkemy API",
            description:"This is a sample API Rest server :: BaseURL [baseURL]/api ",
            version:"1.0.0"
          },
          servers:[
            {url: "http://localhost:9000"}
          ]
        },
        apis:[
         // `${path.join(__dirname,"./*.js")}`
          `${path.join(__dirname,"./documentation/*.yaml")}`
        ]
      }
    

    router.use(swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerSpec)));


    return router

}

module.exports = {
    docsHandler
}