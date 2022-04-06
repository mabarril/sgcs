import axios from 'axios';
// import { getAccessToken } from '../components/Auth/Security/SecurityUtils';
// import { showError } from '../components/Commons/Alert';

export const NO_ALERT_ERROR = { noAlertError: true };
export const NO_HEADER_AUTHORIZATION = { noHeaderAuthorization: true };

export default function activeInterceptor() {

    // Adiciona um interceptador na requisição
    axios.interceptors.request.use(
        async function (config) {
            // Faz alguma coisa antes da requisição ser enviada
            // console.log('axios interceptor 1', config);

            // config.headers.common['Access-Control-Allow-Origin'] = '*';
            if (!config.noHeaderAuthorization) {
                // Add Access Token in Requisiton Header
                const access_token = 'EKEWX6M4W1M462RI5H1D2GSX5SRYIF8A'
                if (access_token) {
                    config.headers.common.Authorization = `Bearer ${access_token}`;
                }
            }

            // Configuração para definir que o código 302 não deve ser considerado erro
            config.validateStatus = function (status) {
                return status < 400;
            }

            // console.log(config);
            return config;
        },
        function (error) {
            // Faz alguma coisa com o erro da requisição
            // console.log('axios interceptor 2', erro);
            return Promise.reject(error);
        });

    // Adiciona um interceptador na resposta
    axios.interceptors.response.use(
        function (response) {
            // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
            // Faz alguma coisa com os dados de resposta
            // console.log('axios interceptor 3', response);
            return response;
        },
        function (error) {
            // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada

            function parseMessageError(error) {
                if (typeof (error) === 'string') {
                    return error;
                }
                return Object.keys(error).flatMap((key) => { return error[key]; }).join('\n');
            }
            //console.log('AXIOS - error:', error);

            const errorJSON = error.toJSON();
            // console.log('axios interceptor 4', errorJSON);

            // Bypass Alert if 'config' has attribute 'noAlertError'
            if (errorJSON.config && errorJSON.config.noAlertError) {
                return Promise.reject(error);
            }

            let message = 'Algo não deu certo, tente novamente...';

            // A requisição foi feita e o servidor respondeu com um código de status que sai do alcance de 2xx
            // console.error('error - response', error.response);
            if (error.response && error.response.data) {
                if (error.response.data.error) {
                    message = parseMessageError(error.response.data.error);
                }
                else if (error.response.data.message) {
                    message = parseMessageError(error.response.data.message);
                }
            }

            // A requisição foi feita mas nenhuma resposta foi recebida
            else if (error.request) {
                // console.error('error.request', error.request);
            }

            // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
            else {
                // console.error('Error', error.message);
                message = parseMessageError(error.message);
            }
            showError(message);

            return Promise.reject(error);
        });
}
