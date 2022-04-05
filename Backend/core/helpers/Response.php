<?php

namespace Core\Helpers;

class Response {
    /**
     * Set default headers
     */
    public static function headers() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    }

    /**
     * Send a JSON response
     * 
     * @param  mixed $response
     * @return void
     */
    public static function json($response) {
        header('Content-Type: application/json');
        exit(json_encode($response));
    }

    /**
     * Send a HTML response
     * 
     * @param  mixed $response
     * @return void
     */
    public static function html($response) {
        header('Content-Type: text/html');
        exit($response);
    }

    /**
     * Set response code header
     * 
     * @param int $code
     * @return void
     */
    public static function code($code = 200) {
        http_response_code($code);
    }
}