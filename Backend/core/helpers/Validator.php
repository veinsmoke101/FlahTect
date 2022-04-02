<?php

namespace Core\Helpers;

use Exception;

/**
 * Validator class
 * 
 * @package    Core
 * @author     Mohammed-Aymen Benadra
 */
class Validator
{
    /**
     * Check if value is valid or not based on the rules provided and return true if valid, error message otherwise
     * 
     * @param  mixed $value
     * @param  array $rules
     * @return array
     * @throws Exception
     */
    public static function validate($value, array $rules)
    {
        $errors = [];

        foreach ($rules as $rule) {
            $rule = explode(':', $rule);
            $ruleName = $rule[0];
            $ruleParam = $rule[1] ?? null;

            if (method_exists(__CLASS__, $ruleName)) {
                $result = $ruleParam ? self::$ruleName($value, $ruleParam) : self::$ruleName($value);

                if ($result !== true) {
                    $errors[] = $result;
                }
            } else {
                throw new Exception("The rule '{$ruleName}' does not exist.");
            }
        }

        if (empty($errors)) {
            return true;
        }

        return $errors;
    }

    /**
     * Check if value is required and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function required($value)
    {
        if (empty($value)) {
            return 'The value is required';
        }

        return true;
    }

    /**
     * Passwords must match.
     * 
     * @param mixed $value
     * @param string $password
     * @return string
     */
    public static function matches($value, $password)
    {
        if ($value !== $password) {
            return 'The passwords must match';
        }

        return true;
    }

    /**
     * Check if value is a string and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function string($value)
    {
        if (!is_string($value)) {
            return 'The value must be a string';
        }

        return true;
    }

    /**
     * Check if value is numeric and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function numeric($value)
    {
        if (!is_numeric($value)) {
            return 'The value must be numeric';
        }

        return true;
    }

    /**
     * Check if value is at least $min characters long and return error if not.
     * 
     * @param mixed $value
     * @param int $min
     * @return string
     */
    public static function min($value, $min)
    {
        switch (true) {
            case is_string($value):
                if (strlen($value) <= (int)$min) {
                    return 'The value must be at least ' . $min . ' characters long';
                }
                break;

            case is_array($value):
                if (count($value) <=  (int)$min) {
                    return 'The value must be at least ' . $min . ' items long';
                }
                break;

            case is_numeric($value):
                if ($value <=  (int)$min) {
                    return 'The value must be at least ' . $min;
                }
                break;

            default:
                return 'The value must be a string or numeric';
                break;
        }

        return true;
    }

    /**
     * Check if value is at most $max characters long and return error if not.
     * 
     * @param mixed $value
     * @param int $max
     * @return string
     */
    public static function max($value, $max)
    {
        switch (true) {
            case is_numeric($value):
                if ($value >=  (int)$max) {
                    return 'The value must be at most ' . $max;
                }
                break;
            case is_string($value):
                if (strlen($value) >=  (int)$max) {
                    return 'The value must be at most ' . $max . ' characters long';
                }
                break;

            case is_array($value):
                if (count($value) >=  (int)$max) {
                    return 'The value must be at most ' . $max . ' items long';
                }
                break;

            default:
                return 'The value must be a string or numeric';
                break;
        }

        return true;
    }

    /**
     * Check if value is an integer and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function int($value)
    {
        if (!is_int($value)) {
            return 'The value must be an integer';
        }

        return true;
    }

    /**
     * Check if value is a float and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function float($value)
    {
        if (!is_float($value)) {
            return 'The value must be a float';
        }

        return true;
    }

    /**
     * Check if value is a bool and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function bool($value)
    {
        if (!is_bool($value)) {
            return 'The value must be a boolean';
        }

        return true;
    }

    /**
     * Check if value is an array and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function array($value)
    {
        if (!is_array($value)) {
            return 'The value must be an array';
        }

        return true;
    }

    /**
     * Check if value is an object and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function object($value)
    {
        if (!is_object($value)) {
            return 'The value must be an object';
        }

        return true;
    }

    /**
     * Check if value is an email and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function email($value)
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return 'The value must be an email';
        }

        return true;
    }

    /**
     * Check if value is a POST File and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function file($value)
    {
        if (!is_array($value) || !isset($value['tmp_name'])) {
            return 'The value must be a file';
        }

        return true;
    }

    /**
     * Check if value is an Image File and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function image($value)
    {
        if (!is_array($value) || !isset($value['tmp_name'])) {
            return 'The value must be an image';
        }

        $image = getimagesize($value['tmp_name']);

        if (!$image) {
            return 'The value must be an image';
        }

        return true;
    }

    /**
     * Check if value is a url and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function url($value)
    {
        if (!filter_var($value, FILTER_VALIDATE_URL)) {
            return 'The value must be a url';
        }

        return true;
    }

    /**
     * Check if value is a date and return error if not.
     * 
     * @param mixed $value
     * @return string
     */
    public static function date($value)
    {
        if (!strtotime($value)) {
            return 'The value must be a date';
        }

        return true;
    }
}
