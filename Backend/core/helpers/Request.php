<?php

namespace Core\Helpers;

/**
 * Request Helper Class
 * - Get Request URI
 * - Get Request Method
 * - Get Request Data (POST, GET)
 * 
 * @package Core\Helpers
 * @author Mohammed-Aymen Benadra
 */
class Request
{
    public $uri;
    public $method;
    public $data;

    /**
     * Create a new Request instance from the current request.
     * 
     * @return void
     */
    public function __construct()
    {
        $this->uri = self::uri();
        $this->method = self::method();
        $this->data = self::data();
    }
    /**
     * Fetch the request URI.
     *
     * @return string
     */
    public static function uri()
    {
        return trim(
            parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH),
            '/'
        );
    }

    /**
     * Fetch the request method.
     *
     * @return string
     */
    public static function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }


    /**
     * Fetch the data associated with request.
     *
     * @return array
     */
    public static function data()
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                return empty($_GET) ? [] : $_GET;
                break;
            case 'POST':
                $data = json_decode(file_get_contents('php://input'), true) ?? $_POST;
                return empty($_FILES) ? $data : array_merge($data, $_FILES);
                break;
            case 'PUT':
                return json_decode(file_get_contents('php://input'), true);
                break;
            case 'DELETE':
                return json_decode(file_get_contents('php://input'), true);
                break;
            default:
                return [];
                break;
        }
    }

    /**
     * Set response code header.
     * 
     * @param int $code
     * @return void
     */
    public static function setResponseCode($code)
    {
        http_response_code($code);
    }
}
