<?php

namespace Core\Middlewares;

use Core\Router;
use Core\Helpers\Request;
use App\Models\{Client, Admin};

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
        $adminUsername = Request::data()['username'] ?? null;

        switch ($role) {
            case 'guest':
                if(!$clientRef && !$adminUsername) {
                    return;
                }
                break;

            case 'client':
                // Check if clientRef exists
                if($this->checkClient($clientRef)) {
                    return;
                }
                break;

            case 'admin':
                // Check if adminToken exists
                if($this->checkAdmin($adminUsername)) {
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
        $client = new Client();

        if ($client->getBy('clientRef', $clientRef)) {
            return true;
        }

        return false;
    }

    /**
     * Checks if admin with adminToken is valid and returns true if it does
     * 
     * @param  string $adminToken
     * @return boolean
     */
    public function checkAdmin($username)
    {
        $admin = new Admin();

        if ($admin->getBy('username', $username)) {
            return true;
        }

        return false;
    }
}
