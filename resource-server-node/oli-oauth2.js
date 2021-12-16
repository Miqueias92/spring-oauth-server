const axios = require('axios');
const FormData = require('form-data'); 

const tokenKey = 'token';
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CHECK_TOKEN_URL: process.env.CHECK_TOKEN_URL,
};

class OAuth2 {

    static authenticatedAccessToken(req,res,next) {
        const token = getToken(req);
        
        if (token == undefined) 
            throw new Error('expected Bearer token');

        loadAuthentication({token})
            .then(response => {
                next();
            }).catch(error => {
                res.json({
                    status: error.response.status,
                    error: error.response.data.error,
                    error_description: error.response.data.error_description
                });
            });
    }
};   

function getToken(req) {
    const authHeader = req.headers['authorization'];
    return authHeader && authHeader.split(' ')[1];
}

async function loadAuthentication(params) {
    let formData = new FormData();
    formData.append(tokenKey, params.token);

    let headers = formData.getHeaders();

    await postAuthorizationToken(formData, headers);
}

async function postAuthorizationToken(formData, headers) {
    await axios.post(config.CHECK_TOKEN_URL,
            formData, 
            {
                headers: headers,
                auth: {
                    username: config.CLIENT_ID, 
                    password: config.CLIENT_SECRET
                }
            });
}

module.exports = OAuth2;