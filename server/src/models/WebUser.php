<?php

class WebUser
{
    private $model;
    private $session;

    public function __construct($model, $session) {
        $this->model = $model;
        $this->session = $session;
    }

    public function login($user) {
        $this->model = $user;
        $this->session->userId = $user->getId();
        $this->session->regenerate();
    }

    public function logout() {
        $this->session->destroy();
    }

    public function isLoggedIn() {
        return $this->session->has('userId');
    }

    public function __get($property) {
        return $this->model->$property;
    }

    public function __set($property, $value) {
        $this->model->$property = $value;
    }

    public function __call($name, $arguments) {
        return call_user_func_array([$this->model, $name], $arguments);
    }
}
