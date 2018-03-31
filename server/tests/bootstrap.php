<?php
// Taken from: http://bytes.schibsted.com/using-phps-built-in-web-server-in-your-test-suites/
$output = [];
exec('nohup php -S 0.0.0.0:8000 > /dev/null 2>&1 & echo $!', $output);
$pid = $output[0];
register_shutdown_function(function() use ($pid) {
    exec('kill ' . $pid);
});