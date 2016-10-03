<?php

function requireRole($roles) {
    if (!is_array($roles)) {
        $roles = ['only' => [$roles]];
    } else {
        foreach ($roles as $key => $value) {
            if (!is_array($value)) {
                $roles[$key] = [$value];
            }
        }
    }
    return function($request, $response, $next) use ($roles) {
        $role = $this->user->isLoggedIn() ? $this->user->getRole() : '?';
        if (isset($roles['only'])) {
            if (!in_array($role, $roles['only'])) {
                return $response->withStatus(401);
            }
        }
        if (isset($roles['not'])) {
            if (in_array($role, $roles['not'])) {
                return $response->withStatus(401);
            }
        }
        return $next($request, $response);
    };
}
