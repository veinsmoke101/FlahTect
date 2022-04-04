<?php

namespace App\Controllers;

use Core\{Controller, Router};
use Core\Helpers\Request;

/**
 * Auth Controller
 *
 * @author Mohammed-Aymen Benadra
 * @package App\Controllers
 */
class Auth extends Controller
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
     * Register a new user
     * 
     * @param array $data
     * @return void
     */
    public function register($data = [])
    {
        // Generate clientRef to data
        $data['clientRef'] = uniqid("client_");

        if (!$this->model->add($data)) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        $client = $this->model->get(
            $this->model->getLastInsertedId()
        );

        exit(json_encode([
            'status' => 'success',
            'data' => $client
        ]));
    }

    /**
     * Login a user using clientRef
     * 
     * @param array $data
     * @return void
     */
    public function login($data = [])
    {
        $client = $this->model->getBy('clientRef', $data['clientRef']);

        if (!$client) {
            Router::abort(404, json_encode([
                'status' => 'error',
                'message' => 'Client not found'
            ]));
        }

        exit(json_encode([
            'status' => 'success',
            'data' => $client
        ]));
    }

    /**
     * Login an admin using username and password
     * 
     * @param array $data
     * @return void
     */
    public function loginAdmin($data = [])
    {
        $admin = $this->model->getBy('username', $data['username']);

        if (!$admin) {
            Router::abort(404, json_encode([
                'status' => 'error',
                'message' => 'Admin not found'
            ]));
        }

        if (!password_verify($data['password'], $admin->password)) {
            Router::abort(401, json_encode([
                'status' => 'error',
                'message' => 'Invalid password'
            ]));
        }

        unset($admin->password);

        exit(json_encode([
            'status' => 'success',
            'data' => $admin
        ]));
    }
}
