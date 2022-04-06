<?php

namespace App\Controllers;

use Core\{Controller, Router};
use Core\Helpers\Response;

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

        Response::headers();
        Response::code();
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

        Response::send([
            'status' => 'success',
            'data' => $clients,
            'count' => count($clients)
        ]);
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
     * Store a Client
     *
     * @param array $data
     * @return void
     */
    public function store($data = [])
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

        Response::send([
            'status' => 'success',
            'data' => $client
        ]);
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

        // check if client exists
        $client = $this->model->get($id);

        if (!$client) {
            Router::abort(404, json_encode([
                'status' => 'error',
                'message' => 'Client not found'
            ]));
        }

        if (!$this->model->update($id, $data)) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        $client = $this->model->get($id);

        Response::send([
            'status' => 'success',
            'data' => $client
        ]);
    }

    /**
     * Delete a Client
     *
     * @param array $data
     * @return void
     */
    public function delete($data = [])
    {
        // check if client exists
        $client = $this->model->get($data['id']);

        if (!$client) {
            Router::abort(404, json_encode([
                'status' => 'error',
                'message' => 'Client not found'
            ]));
        }

        if (!$this->model->delete($data['id'])) {
            Router::abort(500, json_encode([
                'status' => 'error',
                'message' => 'Server error'
            ]));
        }

        Response::send([
            'status' => 'success'
        ]);
    }
}
