<?php

namespace App\Controllers;

use Core\{Controller, Router};
use Core\Helpers\Request;

/**
 * Clients Controller
 *
 * @author Mohammed-Aymen Benadra
 * @package App\Controllers
 */
class Clients extends Controller
{
    private $model;
    /**
     * Set headers for JSON response
     *
     * @return void
     */
    public function __construct()
    {
        // Set default Model for this controller
        $this->model = $this->model('Client');

        // Set basic headers for JSON response
        header('Content-Type: application/json; charset=UTF-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

        // set response code
        Request::setResponseCode(200);
    }

    /**
     * Get all Clients
     *
     * @return void
     */
    public function index()
    {
        $clients = $this->model->getAll();

        if ($clients === false) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        exit(json_encode([
            'status' => 'success',
            'data' => $clients,
            'count' => count($clients)
        ]));
    }

    /**
     * Get a Client
     *
     * @param array $data
     * @return void
     */
    public function show($data = [])
    {
        $client = $this->model->get($data['id']);

        if ($client === false) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        exit(json_encode([
            'status' => 'success',
            'data' => $client
        ]));
    }

    /**
     * Create a Client
     *
     * @param array $data
     * @return void
     */
    public function create($data = [])
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
     * Update a Client
     *
     * @param array $data
     * @return void
     */
    public function update($data = [])
    {
        $id = $data['id'];
        unset($data['id']);

        if (!$this->model->update($id, $data)) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        $client = $this->model->get($id);

        exit(json_encode([
            'status' => 'success',
            'data' => $client
        ]));
    }

    /**
     * Delete a Client
     *
     * @param array $data
     * @return void
     */
    public function delete($data = [])
    {
        if (!$this->model->delete($data['id'])) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        exit(json_encode([
            'status' => 'success',
            'data' => []
        ]));
    }
}
