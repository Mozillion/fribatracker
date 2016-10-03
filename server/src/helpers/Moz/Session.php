<?php
namespace Moz;

class Session
{
    public function __construct($settings) {
        $this->start();
    }

    public function start() {
        session_start();
    }

    public function destroy() {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }
        session_destroy();
    }

    public function regenerate() {
        return session_regenerate_id();
    }

    public function has($property) {
        return isset($_SESSION[$property]);
    }

    public function get($property, $defaultValue = null) {
        return $this->has($property) ? $_SESSION[$property] : $defaultValue;
    }

    public function set($property, $value) {
        $_SESSION[$property] = $value;
    }

    public function remove($property) {
        unset($_SESSION[$property]);
    }

    public function __isset($property) {
        return $this->has($property);
    }

    public function __get($property) {
        return $this->get($property);
    }

    public function __set($property, $value) {
        $this->set($property, $value);
    }

    public function __unset($property) {
        $this->remove($property);
    }
}
