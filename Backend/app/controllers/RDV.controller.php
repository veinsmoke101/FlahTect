<?php

namespace App\Controllers;

use Core\{Controller, Router};
use Core\Helpers\Request;

/**
 * Api Controller
 *
 * @author Mohammed-Aymen Benadra
 * @package App\Controllers
 */
class Api extends Controller
{
    /**
     * Set headers for JSON response
     *
     * @return void
     */
    public function __construct()
    {
        // Set basic headers for JSON response
        header('Content-Type: application/json; charset=UTF-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

        // set response code
        Request::setResponseCode(200);
    }

    /**
     * Show Api documentation
     * 
     * @return void
     */
    public function index()
    {
        // Set content type
        header('Content-Type: text/html; charset=UTF-8');
        // Render Api documentation
        $this->view('api/index');
    }

    /**
     * Get all examples
     *
     * @return void
     */
    public function examples()
    {
        $examples = $this->model('Example')->getAll();

        if (!$examples) {
            Router::abort(404, json_encode([
                'status' => 'error',
                'message' => 'No examples found'
            ]));
        }

        exit(json_encode([
            'status' => 'success',
            'data' => $examples,
            'count' => count($examples)
        ]));
    }
}
