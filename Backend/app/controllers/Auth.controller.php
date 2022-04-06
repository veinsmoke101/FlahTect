<?php

namespace App\Controllers;

use Core\{Controller, Router};
use Core\Helpers\Response;
use Firebase\JWT\{JWT};

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
        Response::headers();
        Response::code();
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

        if (!$this->model('Client')->add($data)) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        $client = $this->model('Client')->get(
            $this->model('Client')->getLastInsertedId()
        );

        Response::send([
            'status' => 'success',
            'data' => $client
        ]);
    }

    /**
     * Login a user using clientRef
     * 
     * @param array $data
     * @return void
     */
    public function login($data = [])
    {
        $client = $this->model('Client')->getBy('clientRef', $data['clientRef']);

        if (!$client) {
            Router::abort(404, json_encode([
                'status' => 'error',
                'message' => 'Client not found'
            ]));
        }

        Response::send([
            'status' => 'success',
            'data' => $client
        ]);
    }

    /**
     * Register new Admin using username and password
     * 
     * @param array $data
     * @return void
     */
    public function registerAdmin($data = [])
    {
        $admin = $this->model('Admin')->getBy('username', $data['username']);

        if ($admin) {
            Router::abort(400, json_encode([
                'status' => 'error',
                'message' => 'Admin already exists'
            ]));
        }

        // Hash password
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

        if (!$this->model('Admin')->add($data)) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        unset($data['password']);

        Response::send([
            'status' => 'success',
            'data' => $data
        ]);
    }

    /**
     * Login an admin using username and password
     * 
     * @param array $data
     * @return void
     */
    public function loginAdmin($data = [])
    {
        $admin = $this->model('Admin')->getBy('username', $data['username']);

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

        $secret_key = $_ENV['JWT_SECRET_KEY'];
        $issuer_claim = $_ENV['SERVER_ADDRESS']; // this can be the servername
        $audience_claim = $_ENV['CLIENT_ADDRESS'];
        $issuedat_claim = time(); // issued at
        $notbefore_claim = $issuedat_claim + 10; //not before in seconds
        $expire_claim = $issuedat_claim + 600; // expire time in seconds (10 minutes)
        $payload = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "sub" => $admin->username
        );

        http_response_code(200);

        $jwt = JWT::encode($payload, $secret_key, "HS256");

        // Set expirable cookie for JWT
        setcookie('jwt', $jwt, $expire_claim, "/", $_ENV['SERVER_ADDRESS'], false, true);

        Response::send(
            array(
                "message" => "Successful login.",
                "jwt" => $jwt
            )
        );
    }
}
