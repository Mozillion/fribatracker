vendor/bin/propel model:build
vendor/bin/propel sql:build
vendor/bin/propel sql:insert

vendor/bin/propel model:build
vendor/bin/propel sql:build && vendor/bin/propel sql:insert

vendor/bin/propel diff
vendor/bin/propel migrate

vendor/bin/propel config:convert
