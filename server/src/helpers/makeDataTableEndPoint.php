<?php
use Propel\Runtime\Map\TableMap;

function makeDataTableEndPoint($queryProvider) {
    return function($request, $response, $args) use ($queryProvider) {
        $params = $queryProvider($request, $args);
        $query = $params['query'];

        $sortable = isset($params['sortable']) ? $params['sortable'] : [];
        if ($sort = $request->getQueryParam('sort')) {
            if (in_array($sort['column'], $sortable)) {
                $direction = in_array($sort['direction'], ['ASC', 'DESC']) ? $sort['direction'] : 'ASC';
                $alias = $query->getColumnForAs($sort['column']);
                if ($alias) {
                    list($join, $column) = explode('.', $alias);
                    $query
                        ->useQuery($join)
                            ->{'orderBy' . ucfirst($sort['column'])}($direction)
                        ->endUse();
                } else {
                    $query->{'orderBy' . ucfirst($sort['column'])}($direction);
                }
            }
        }

        $filterable = isset($params['filterable']) ? $params['filterable'] : [];
        if ($filter = $request->getQueryParam('filter')) {
            foreach ($filter as $column => $comparators) {
                if (in_array($column, $filterable)) {
                    foreach ($comparators as $comparator => $value) {
                        if ($value !== '' && in_array($comparator, ['=','<','<=','>','>=','IN','LIKE'])) {
                            if (in_array($comparator, ['LIKE'])) {
                                $comparator = " $comparator ";
                                $value = "%$value%";
                            }
                            $alias = $query->getColumnForAs($column);
                            if ($alias) {
                                list($join, $column) = explode('.', $alias);
                                $query
                                    ->useQuery($join)
                                        ->{'filterBy' . ucfirst($column)}($value, $comparator)
                                    ->endUse();
                            } else {
                                $query->{'filterBy' . ucfirst($column)}($value, $comparator);
                            }
                        }
                    }
                }
            }
        }

        $page = max(1, $request->getQueryParam('page', 1));
        $pageSize = max(100, $request->getQueryParam('pageSize', 10));
        $pager = $query->paginate($page, $pageSize);

        $data = [];
        foreach ($pager as $row) {
            $data[] = $row->toArray(TableMap::TYPE_CAMELNAME);
        }
        return $response->withJson([
            'ok' => true,
            'data' => $data,
            'totalItems' => $pager->getNbResults()
        ]);
    };
}
