<?php

namespace Core\Middlewares;

use Core\Helpers\Request;
use Core\Helpers\Validator;

/**
 * Verification class
 * 
 * @package    Core
 * @author     Mohammed-Aymen Benadra
 */
class Validation
{
    /**
     * Rules to validate
     * 
     * @var array
     */
    private $rules = [];

    /**
     * Validation constructor
     */
    public function __construct()
    {
        $this->rules = require_once '../app/config/validation-rules.php';
    }

    /**
     * Validate the request data with the rules defined in the config file
     * 
     * @param  string $fields
     * @return boolean
     */
    public function handle(string $fields)
    {
        $fields = explode('|', $fields);
        $data = self::sanitize(Request::data());
        $rulesToValidate = [];

        // Get the rules to validate 
        foreach ($fields as $field) {
            $rulesToValidate[$field] = $this->rules[$field];
        }

        // if data fields count is not equal to the rules count, return false
        if (count($data) !== count($rulesToValidate)) {
            echo 'Data fields count is not equal to the rules provided';
            return false;
        }

        // Chack data fields validity
        if(array_diff(array_keys($data), array_keys($rulesToValidate))) {
            echo 'Data fields are not valid';
            return false;
        }

        // Validate each field
        foreach ($rulesToValidate as $field => $rules) {
            $value = $data[$field];
            $rules = explode('|', $rules);

            $result = Validator::validate($value, $rules);

            if ($result !== true) {
                echo 'Data field ' . $field . ' is not valid';
                return false;
            }
        }

        return true;
    }


    /**
     * Sanitize data
     * 
     * @param  array $data
     * @return array
     */
    public static function sanitize($data)
    {
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $data[$key] = self::sanitize($value);
            } else {
                $data[$key] = htmlspecialchars($value);
            }
        }
        return $data;
    }
}
