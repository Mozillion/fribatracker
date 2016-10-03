<?php

namespace Moz\Base;

use \Exception;
use \PDO;
use Moz\LayoutFairway as ChildLayoutFairway;
use Moz\LayoutFairwayQuery as ChildLayoutFairwayQuery;
use Moz\Map\LayoutFairwayTableMap;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\ModelCriteria;
use Propel\Runtime\ActiveQuery\ModelJoin;
use Propel\Runtime\Collection\ObjectCollection;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Exception\PropelException;

/**
 * Base class that represents a query for the 'layout_fairway' table.
 *
 * 
 *
 * @method     ChildLayoutFairwayQuery orderByLayoutId($order = Criteria::ASC) Order by the layout_id column
 * @method     ChildLayoutFairwayQuery orderByFairwayId($order = Criteria::ASC) Order by the fairway_id column
 * @method     ChildLayoutFairwayQuery orderByOrdinal($order = Criteria::ASC) Order by the ordinal column
 *
 * @method     ChildLayoutFairwayQuery groupByLayoutId() Group by the layout_id column
 * @method     ChildLayoutFairwayQuery groupByFairwayId() Group by the fairway_id column
 * @method     ChildLayoutFairwayQuery groupByOrdinal() Group by the ordinal column
 *
 * @method     ChildLayoutFairwayQuery leftJoin($relation) Adds a LEFT JOIN clause to the query
 * @method     ChildLayoutFairwayQuery rightJoin($relation) Adds a RIGHT JOIN clause to the query
 * @method     ChildLayoutFairwayQuery innerJoin($relation) Adds a INNER JOIN clause to the query
 *
 * @method     ChildLayoutFairwayQuery leftJoinWith($relation) Adds a LEFT JOIN clause and with to the query
 * @method     ChildLayoutFairwayQuery rightJoinWith($relation) Adds a RIGHT JOIN clause and with to the query
 * @method     ChildLayoutFairwayQuery innerJoinWith($relation) Adds a INNER JOIN clause and with to the query
 *
 * @method     ChildLayoutFairwayQuery leftJoinLayout($relationAlias = null) Adds a LEFT JOIN clause to the query using the Layout relation
 * @method     ChildLayoutFairwayQuery rightJoinLayout($relationAlias = null) Adds a RIGHT JOIN clause to the query using the Layout relation
 * @method     ChildLayoutFairwayQuery innerJoinLayout($relationAlias = null) Adds a INNER JOIN clause to the query using the Layout relation
 *
 * @method     ChildLayoutFairwayQuery joinWithLayout($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the Layout relation
 *
 * @method     ChildLayoutFairwayQuery leftJoinWithLayout() Adds a LEFT JOIN clause and with to the query using the Layout relation
 * @method     ChildLayoutFairwayQuery rightJoinWithLayout() Adds a RIGHT JOIN clause and with to the query using the Layout relation
 * @method     ChildLayoutFairwayQuery innerJoinWithLayout() Adds a INNER JOIN clause and with to the query using the Layout relation
 *
 * @method     ChildLayoutFairwayQuery leftJoinFairway($relationAlias = null) Adds a LEFT JOIN clause to the query using the Fairway relation
 * @method     ChildLayoutFairwayQuery rightJoinFairway($relationAlias = null) Adds a RIGHT JOIN clause to the query using the Fairway relation
 * @method     ChildLayoutFairwayQuery innerJoinFairway($relationAlias = null) Adds a INNER JOIN clause to the query using the Fairway relation
 *
 * @method     ChildLayoutFairwayQuery joinWithFairway($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the Fairway relation
 *
 * @method     ChildLayoutFairwayQuery leftJoinWithFairway() Adds a LEFT JOIN clause and with to the query using the Fairway relation
 * @method     ChildLayoutFairwayQuery rightJoinWithFairway() Adds a RIGHT JOIN clause and with to the query using the Fairway relation
 * @method     ChildLayoutFairwayQuery innerJoinWithFairway() Adds a INNER JOIN clause and with to the query using the Fairway relation
 *
 * @method     \Moz\LayoutQuery|\Moz\FairwayQuery endUse() Finalizes a secondary criteria and merges it with its primary Criteria
 *
 * @method     ChildLayoutFairway findOne(ConnectionInterface $con = null) Return the first ChildLayoutFairway matching the query
 * @method     ChildLayoutFairway findOneOrCreate(ConnectionInterface $con = null) Return the first ChildLayoutFairway matching the query, or a new ChildLayoutFairway object populated from the query conditions when no match is found
 *
 * @method     ChildLayoutFairway findOneByLayoutId(int $layout_id) Return the first ChildLayoutFairway filtered by the layout_id column
 * @method     ChildLayoutFairway findOneByFairwayId(int $fairway_id) Return the first ChildLayoutFairway filtered by the fairway_id column
 * @method     ChildLayoutFairway findOneByOrdinal(int $ordinal) Return the first ChildLayoutFairway filtered by the ordinal column *

 * @method     ChildLayoutFairway requirePk($key, ConnectionInterface $con = null) Return the ChildLayoutFairway by primary key and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildLayoutFairway requireOne(ConnectionInterface $con = null) Return the first ChildLayoutFairway matching the query and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildLayoutFairway requireOneByLayoutId(int $layout_id) Return the first ChildLayoutFairway filtered by the layout_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildLayoutFairway requireOneByFairwayId(int $fairway_id) Return the first ChildLayoutFairway filtered by the fairway_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildLayoutFairway requireOneByOrdinal(int $ordinal) Return the first ChildLayoutFairway filtered by the ordinal column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildLayoutFairway[]|ObjectCollection find(ConnectionInterface $con = null) Return ChildLayoutFairway objects based on current ModelCriteria
 * @method     ChildLayoutFairway[]|ObjectCollection findByLayoutId(int $layout_id) Return ChildLayoutFairway objects filtered by the layout_id column
 * @method     ChildLayoutFairway[]|ObjectCollection findByFairwayId(int $fairway_id) Return ChildLayoutFairway objects filtered by the fairway_id column
 * @method     ChildLayoutFairway[]|ObjectCollection findByOrdinal(int $ordinal) Return ChildLayoutFairway objects filtered by the ordinal column
 * @method     ChildLayoutFairway[]|\Propel\Runtime\Util\PropelModelPager paginate($page = 1, $maxPerPage = 10, ConnectionInterface $con = null) Issue a SELECT query based on the current ModelCriteria and uses a page and a maximum number of results per page to compute an offset and a limit
 *
 */
abstract class LayoutFairwayQuery extends ModelCriteria
{
    protected $entityNotFoundExceptionClass = '\\Propel\\Runtime\\Exception\\EntityNotFoundException';

    /**
     * Initializes internal state of \Moz\Base\LayoutFairwayQuery object.
     *
     * @param     string $dbName The database name
     * @param     string $modelName The phpName of a model, e.g. 'Book'
     * @param     string $modelAlias The alias for the model in this query, e.g. 'b'
     */
    public function __construct($dbName = 'default', $modelName = '\\Moz\\LayoutFairway', $modelAlias = null)
    {
        parent::__construct($dbName, $modelName, $modelAlias);
    }

    /**
     * Returns a new ChildLayoutFairwayQuery object.
     *
     * @param     string $modelAlias The alias of a model in the query
     * @param     Criteria $criteria Optional Criteria to build the query from
     *
     * @return ChildLayoutFairwayQuery
     */
    public static function create($modelAlias = null, Criteria $criteria = null)
    {
        if ($criteria instanceof ChildLayoutFairwayQuery) {
            return $criteria;
        }
        $query = new ChildLayoutFairwayQuery();
        if (null !== $modelAlias) {
            $query->setModelAlias($modelAlias);
        }
        if ($criteria instanceof Criteria) {
            $query->mergeWith($criteria);
        }

        return $query;
    }

    /**
     * Find object by primary key.
     * Propel uses the instance pool to skip the database if the object exists.
     * Go fast if the query is untouched.
     *
     * <code>
     * $obj = $c->findPk(array(12, 34), $con);
     * </code>
     *
     * @param array[$layout_id, $fairway_id] $key Primary key to use for the query
     * @param ConnectionInterface $con an optional connection object
     *
     * @return ChildLayoutFairway|array|mixed the result, formatted by the current formatter
     */
    public function findPk($key, ConnectionInterface $con = null)
    {
        if ($key === null) {
            return null;
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getReadConnection(LayoutFairwayTableMap::DATABASE_NAME);
        }

        $this->basePreSelect($con);

        if (
            $this->formatter || $this->modelAlias || $this->with || $this->select
            || $this->selectColumns || $this->asColumns || $this->selectModifiers
            || $this->map || $this->having || $this->joins
        ) {
            return $this->findPkComplex($key, $con);
        }

        if ((null !== ($obj = LayoutFairwayTableMap::getInstanceFromPool(serialize([(null === $key[0] || is_scalar($key[0]) || is_callable([$key[0], '__toString']) ? (string) $key[0] : $key[0]), (null === $key[1] || is_scalar($key[1]) || is_callable([$key[1], '__toString']) ? (string) $key[1] : $key[1])]))))) {
            // the object is already in the instance pool
            return $obj;
        }

        return $this->findPkSimple($key, $con);
    }

    /**
     * Find object by primary key using raw SQL to go fast.
     * Bypass doSelect() and the object formatter by using generated code.
     *
     * @param     mixed $key Primary key to use for the query
     * @param     ConnectionInterface $con A connection object
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildLayoutFairway A model object, or null if the key is not found
     */
    protected function findPkSimple($key, ConnectionInterface $con)
    {
        $sql = 'SELECT layout_id, fairway_id, ordinal FROM layout_fairway WHERE layout_id = :p0 AND fairway_id = :p1';
        try {
            $stmt = $con->prepare($sql);            
            $stmt->bindValue(':p0', $key[0], PDO::PARAM_INT);            
            $stmt->bindValue(':p1', $key[1], PDO::PARAM_INT);
            $stmt->execute();
        } catch (Exception $e) {
            Propel::log($e->getMessage(), Propel::LOG_ERR);
            throw new PropelException(sprintf('Unable to execute SELECT statement [%s]', $sql), 0, $e);
        }
        $obj = null;
        if ($row = $stmt->fetch(\PDO::FETCH_NUM)) {
            /** @var ChildLayoutFairway $obj */
            $obj = new ChildLayoutFairway();
            $obj->hydrate($row);
            LayoutFairwayTableMap::addInstanceToPool($obj, serialize([(null === $key[0] || is_scalar($key[0]) || is_callable([$key[0], '__toString']) ? (string) $key[0] : $key[0]), (null === $key[1] || is_scalar($key[1]) || is_callable([$key[1], '__toString']) ? (string) $key[1] : $key[1])]));
        }
        $stmt->closeCursor();

        return $obj;
    }

    /**
     * Find object by primary key.
     *
     * @param     mixed $key Primary key to use for the query
     * @param     ConnectionInterface $con A connection object
     *
     * @return ChildLayoutFairway|array|mixed the result, formatted by the current formatter
     */
    protected function findPkComplex($key, ConnectionInterface $con)
    {
        // As the query uses a PK condition, no limit(1) is necessary.
        $criteria = $this->isKeepQuery() ? clone $this : $this;
        $dataFetcher = $criteria
            ->filterByPrimaryKey($key)
            ->doSelect($con);

        return $criteria->getFormatter()->init($criteria)->formatOne($dataFetcher);
    }

    /**
     * Find objects by primary key
     * <code>
     * $objs = $c->findPks(array(array(12, 56), array(832, 123), array(123, 456)), $con);
     * </code>
     * @param     array $keys Primary keys to use for the query
     * @param     ConnectionInterface $con an optional connection object
     *
     * @return ObjectCollection|array|mixed the list of results, formatted by the current formatter
     */
    public function findPks($keys, ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getReadConnection($this->getDbName());
        }
        $this->basePreSelect($con);
        $criteria = $this->isKeepQuery() ? clone $this : $this;
        $dataFetcher = $criteria
            ->filterByPrimaryKeys($keys)
            ->doSelect($con);

        return $criteria->getFormatter()->init($criteria)->format($dataFetcher);
    }

    /**
     * Filter the query by primary key
     *
     * @param     mixed $key Primary key to use for the query
     *
     * @return $this|ChildLayoutFairwayQuery The current query, for fluid interface
     */
    public function filterByPrimaryKey($key)
    {
        $this->addUsingAlias(LayoutFairwayTableMap::COL_LAYOUT_ID, $key[0], Criteria::EQUAL);
        $this->addUsingAlias(LayoutFairwayTableMap::COL_FAIRWAY_ID, $key[1], Criteria::EQUAL);

        return $this;
    }

    /**
     * Filter the query by a list of primary keys
     *
     * @param     array $keys The list of primary key to use for the query
     *
     * @return $this|ChildLayoutFairwayQuery The current query, for fluid interface
     */
    public function filterByPrimaryKeys($keys)
    {
        if (empty($keys)) {
            return $this->add(null, '1<>1', Criteria::CUSTOM);
        }
        foreach ($keys as $key) {
            $cton0 = $this->getNewCriterion(LayoutFairwayTableMap::COL_LAYOUT_ID, $key[0], Criteria::EQUAL);
            $cton1 = $this->getNewCriterion(LayoutFairwayTableMap::COL_FAIRWAY_ID, $key[1], Criteria::EQUAL);
            $cton0->addAnd($cton1);
            $this->addOr($cton0);
        }

        return $this;
    }

    /**
     * Filter the query on the layout_id column
     *
     * Example usage:
     * <code>
     * $query->filterByLayoutId(1234); // WHERE layout_id = 1234
     * $query->filterByLayoutId(array(12, 34)); // WHERE layout_id IN (12, 34)
     * $query->filterByLayoutId(array('min' => 12)); // WHERE layout_id > 12
     * </code>
     *
     * @see       filterByLayout()
     *
     * @param     mixed $layoutId The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildLayoutFairwayQuery The current query, for fluid interface
     */
    public function filterByLayoutId($layoutId = null, $comparison = null)
    {
        if (is_array($layoutId)) {
            $useMinMax = false;
            if (isset($layoutId['min'])) {
                $this->addUsingAlias(LayoutFairwayTableMap::COL_LAYOUT_ID, $layoutId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($layoutId['max'])) {
                $this->addUsingAlias(LayoutFairwayTableMap::COL_LAYOUT_ID, $layoutId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(LayoutFairwayTableMap::COL_LAYOUT_ID, $layoutId, $comparison);
    }

    /**
     * Filter the query on the fairway_id column
     *
     * Example usage:
     * <code>
     * $query->filterByFairwayId(1234); // WHERE fairway_id = 1234
     * $query->filterByFairwayId(array(12, 34)); // WHERE fairway_id IN (12, 34)
     * $query->filterByFairwayId(array('min' => 12)); // WHERE fairway_id > 12
     * </code>
     *
     * @see       filterByFairway()
     *
     * @param     mixed $fairwayId The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildLayoutFairwayQuery The current query, for fluid interface
     */
    public function filterByFairwayId($fairwayId = null, $comparison = null)
    {
        if (is_array($fairwayId)) {
            $useMinMax = false;
            if (isset($fairwayId['min'])) {
                $this->addUsingAlias(LayoutFairwayTableMap::COL_FAIRWAY_ID, $fairwayId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($fairwayId['max'])) {
                $this->addUsingAlias(LayoutFairwayTableMap::COL_FAIRWAY_ID, $fairwayId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(LayoutFairwayTableMap::COL_FAIRWAY_ID, $fairwayId, $comparison);
    }

    /**
     * Filter the query on the ordinal column
     *
     * Example usage:
     * <code>
     * $query->filterByOrdinal(1234); // WHERE ordinal = 1234
     * $query->filterByOrdinal(array(12, 34)); // WHERE ordinal IN (12, 34)
     * $query->filterByOrdinal(array('min' => 12)); // WHERE ordinal > 12
     * </code>
     *
     * @param     mixed $ordinal The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildLayoutFairwayQuery The current query, for fluid interface
     */
    public function filterByOrdinal($ordinal = null, $comparison = null)
    {
        if (is_array($ordinal)) {
            $useMinMax = false;
            if (isset($ordinal['min'])) {
                $this->addUsingAlias(LayoutFairwayTableMap::COL_ORDINAL, $ordinal['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($ordinal['max'])) {
                $this->addUsingAlias(LayoutFairwayTableMap::COL_ORDINAL, $ordinal['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(LayoutFairwayTableMap::COL_ORDINAL, $ordinal, $comparison);
    }

    /**
     * Filter the query by a related \Moz\Layout object
     *
     * @param \Moz\Layout|ObjectCollection $layout The related object(s) to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildLayoutFairwayQuery The current query, for fluid interface
     */
    public function filterByLayout($layout, $comparison = null)
    {
        if ($layout instanceof \Moz\Layout) {
            return $this
                ->addUsingAlias(LayoutFairwayTableMap::COL_LAYOUT_ID, $layout->getId(), $comparison);
        } elseif ($layout instanceof ObjectCollection) {
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }

            return $this
                ->addUsingAlias(LayoutFairwayTableMap::COL_LAYOUT_ID, $layout->toKeyValue('PrimaryKey', 'Id'), $comparison);
        } else {
            throw new PropelException('filterByLayout() only accepts arguments of type \Moz\Layout or Collection');
        }
    }

    /**
     * Adds a JOIN clause to the query using the Layout relation
     *
     * @param     string $relationAlias optional alias for the relation
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return $this|ChildLayoutFairwayQuery The current query, for fluid interface
     */
    public function joinLayout($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        $tableMap = $this->getTableMap();
        $relationMap = $tableMap->getRelation('Layout');

        // create a ModelJoin object for this join
        $join = new ModelJoin();
        $join->setJoinType($joinType);
        $join->setRelationMap($relationMap, $this->useAliasInSQL ? $this->getModelAlias() : null, $relationAlias);
        if ($previousJoin = $this->getPreviousJoin()) {
            $join->setPreviousJoin($previousJoin);
        }

        // add the ModelJoin to the current object
        if ($relationAlias) {
            $this->addAlias($relationAlias, $relationMap->getRightTable()->getName());
            $this->addJoinObject($join, $relationAlias);
        } else {
            $this->addJoinObject($join, 'Layout');
        }

        return $this;
    }

    /**
     * Use the Layout relation Layout object
     *
     * @see useQuery()
     *
     * @param     string $relationAlias optional alias for the relation,
     *                                   to be used as main alias in the secondary query
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return \Moz\LayoutQuery A secondary query class using the current class as primary query
     */
    public function useLayoutQuery($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        return $this
            ->joinLayout($relationAlias, $joinType)
            ->useQuery($relationAlias ? $relationAlias : 'Layout', '\Moz\LayoutQuery');
    }

    /**
     * Filter the query by a related \Moz\Fairway object
     *
     * @param \Moz\Fairway|ObjectCollection $fairway The related object(s) to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildLayoutFairwayQuery The current query, for fluid interface
     */
    public function filterByFairway($fairway, $comparison = null)
    {
        if ($fairway instanceof \Moz\Fairway) {
            return $this
                ->addUsingAlias(LayoutFairwayTableMap::COL_FAIRWAY_ID, $fairway->getId(), $comparison);
        } elseif ($fairway instanceof ObjectCollection) {
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }

            return $this
                ->addUsingAlias(LayoutFairwayTableMap::COL_FAIRWAY_ID, $fairway->toKeyValue('PrimaryKey', 'Id'), $comparison);
        } else {
            throw new PropelException('filterByFairway() only accepts arguments of type \Moz\Fairway or Collection');
        }
    }

    /**
     * Adds a JOIN clause to the query using the Fairway relation
     *
     * @param     string $relationAlias optional alias for the relation
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return $this|ChildLayoutFairwayQuery The current query, for fluid interface
     */
    public function joinFairway($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        $tableMap = $this->getTableMap();
        $relationMap = $tableMap->getRelation('Fairway');

        // create a ModelJoin object for this join
        $join = new ModelJoin();
        $join->setJoinType($joinType);
        $join->setRelationMap($relationMap, $this->useAliasInSQL ? $this->getModelAlias() : null, $relationAlias);
        if ($previousJoin = $this->getPreviousJoin()) {
            $join->setPreviousJoin($previousJoin);
        }

        // add the ModelJoin to the current object
        if ($relationAlias) {
            $this->addAlias($relationAlias, $relationMap->getRightTable()->getName());
            $this->addJoinObject($join, $relationAlias);
        } else {
            $this->addJoinObject($join, 'Fairway');
        }

        return $this;
    }

    /**
     * Use the Fairway relation Fairway object
     *
     * @see useQuery()
     *
     * @param     string $relationAlias optional alias for the relation,
     *                                   to be used as main alias in the secondary query
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return \Moz\FairwayQuery A secondary query class using the current class as primary query
     */
    public function useFairwayQuery($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        return $this
            ->joinFairway($relationAlias, $joinType)
            ->useQuery($relationAlias ? $relationAlias : 'Fairway', '\Moz\FairwayQuery');
    }

    /**
     * Exclude object from result
     *
     * @param   ChildLayoutFairway $layoutFairway Object to remove from the list of results
     *
     * @return $this|ChildLayoutFairwayQuery The current query, for fluid interface
     */
    public function prune($layoutFairway = null)
    {
        if ($layoutFairway) {
            $this->addCond('pruneCond0', $this->getAliasedColName(LayoutFairwayTableMap::COL_LAYOUT_ID), $layoutFairway->getLayoutId(), Criteria::NOT_EQUAL);
            $this->addCond('pruneCond1', $this->getAliasedColName(LayoutFairwayTableMap::COL_FAIRWAY_ID), $layoutFairway->getFairwayId(), Criteria::NOT_EQUAL);
            $this->combine(array('pruneCond0', 'pruneCond1'), Criteria::LOGICAL_OR);
        }

        return $this;
    }

    /**
     * Deletes all rows from the layout_fairway table.
     *
     * @param ConnectionInterface $con the connection to use
     * @return int The number of affected rows (if supported by underlying database driver).
     */
    public function doDeleteAll(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(LayoutFairwayTableMap::DATABASE_NAME);
        }

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            $affectedRows += parent::doDeleteAll($con);
            // Because this db requires some delete cascade/set null emulation, we have to
            // clear the cached instance *after* the emulation has happened (since
            // instances get re-added by the select statement contained therein).
            LayoutFairwayTableMap::clearInstancePool();
            LayoutFairwayTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

    /**
     * Performs a DELETE on the database based on the current ModelCriteria
     *
     * @param ConnectionInterface $con the connection to use
     * @return int             The number of affected rows (if supported by underlying database driver).  This includes CASCADE-related rows
     *                         if supported by native driver or if emulated using Propel.
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     */
    public function delete(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(LayoutFairwayTableMap::DATABASE_NAME);
        }

        $criteria = $this;

        // Set the correct dbName
        $criteria->setDbName(LayoutFairwayTableMap::DATABASE_NAME);

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con, $criteria) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            
            LayoutFairwayTableMap::removeInstanceFromPool($criteria);
        
            $affectedRows += ModelCriteria::delete($con);
            LayoutFairwayTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

} // LayoutFairwayQuery
