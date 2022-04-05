<?php

namespace Core\Middlewares;

use Core\Router;
use Core\Helpers\Request;
use App\Models\{Client, Admin};
use Firebase\JWT\{JWT, Key};

/**
 * Auth class
 * - Handle the request
 * - Check if the user is authenticated
 * - Check if the user is authorized 
 * 
 * @package    Core
 * @author     Mohammed-Aymen Benadra
 * 
 */
class Auth
{
    /**
     * Handle Authentication using session
     * 
     * @param  mixed $role
     * @return void
     */
    public function handle($role)
    {
        $clientRef = Request::data()['clientRef'] ?? null;
        $adminUsername = Request::authorization() ?? null;

        switch ($role) {
            case 'guest':
                if (!$clientRef && !$adminUsername) {
                    return;
                }
                break;

            case 'client':
                // Check if clientRef exists
                if ($this->checkClient($clientRef)) {
                    return;
                }
                break;

            case 'admin':
                // Check if adminToken exists
                if ($this->checkAdmin($adminUsername)) {
                    return;
                }
                break;

            default:
                break;
        }

        // Redirect to login page if guest and to home page if user
        if (!$clientRef && !$adminUsername) {
            Router::abort(401, json_encode([
                'status' => 'error',
                'message' => 'Unauthorized: You must be logged in'
            ]));
        } else {
            Router::abort(401, json_encode([
                'status' => 'error',
                'message' => 'Unauthorized: You\'re not allowed to access this page'
            ]));
        }
    }

    /**
     * Checks if client with clientRef exists and returns true if it does
     * 
     * @param  string $clientRef
     * @return boolean
     */
    public function checkClient($clientRef)
    {
        if (!$clientRef) {
            return false;
        }

        $client = new Client();

        if ($client->getBy('clientRef', $clientRef)) {
            return true;
        }

        return false;
    }

    /**
     * Checks if admin with adminToken is valid and returns true if it does
     * 
     * @param  string $jwt
     * @return boolean
     */
    public function checkAdmin($jwt)
    {
        if (!$jwt) {
            return false;
        }
        try {
            $token = JWT::decode($jwt, new Key($_ENV['JWT_SECRET_KEY'], "HS256"));

            // Check if admin exists
            $admin = (new Admin())->getBy('username', $token->sub);
            if (!$admin) {
                throw new \Exception('Admin not found');
            }

            return true;
        } catch (\Exception $e) {
            Router::abort(401, json_encode([
                'status' => 'error',
                'message' => 'Unauthorized: ' . $e->getMessage()
            ]));
        }
    }
}
