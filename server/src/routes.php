<?php
use Moz\UserQuery;
use Propel\Runtime\Map\TableMap;

$app->group('/api', function() {
    $this->post('/foo', function($request, $response, $args) {
        return $response->withJson([
            'ok' => true
        ]);
    });
    $this->get('/getItems', makeDataTableEndPoint(function($request, $args) {
        return [
            'query' => UserQuery::create()->joinUserData('data')->withColumn('data.age', 'age'),
            'sortable' => ['username','age'],
            'filterable' => ['username','age']
        ];
    }));
})
->add(requireRole(['not' => '?']));

$app->post('/login', function($request, $response, $args) {
    $ok = false;
    $alerts = [];
    $input = $request->getParsedBody();
    $user = UserQuery::create()->filterByUsername($input['username'])->findOne();
    if ($user && $user->verifyPassword($input['password'])) {
        $this->user->login($user);
        $ok = true;
    } else {
        $alerts[] = 'Väärä tunnus tai salasana';
    }

    return $response->withJson([
        'alerts' => $alerts,
        'user' => $this->user->toArray(TableMap::TYPE_CAMELNAME)
    ], $ok ? 200 : 400);
});

$app->post('/logout', function($request, $response, $args) {
    $this->user->logout();
    return $response->withJson([
        'ok' => true
    ]);
});

$app->get('/[{path:.*}]', function($request, $response, $args) {
    return $this->renderer->render($response, 'index.php', [
        'user' => $this->user
    ]);
});
