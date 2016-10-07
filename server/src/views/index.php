<?php
use \Propel\Runtime\Map\TableMap;
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Cycle</title>
        <script type="text/javascript">
            window.__INITIAL_DATA__ = {
                user: <?= json_encode($user->isLoggedIn() ? $user->toArray(TableMap::TYPE_CAMELNAME) : null) ?>
            };
        </script>
        <script defer type="text/javascript" src="/vendor.js"></script>
        <script defer type="text/javascript" src="/app.js"></script>
        <link rel="stylesheet" type="text/css" href="/app.css">
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
