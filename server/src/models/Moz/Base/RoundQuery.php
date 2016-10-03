<?php

namespace Moz\Base;

use \Exception;
use \PDO;
use Moz\Round as ChildRound;
use Moz\RoundQuery as ChildRoundQuery;
use Moz\Map\RoundTableMap;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\ModelCriteria;
use Propel\Runtime\ActiveQuery\ModelJoin;
use Propel\Runtime\Collection\ObjectCollection;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Exception\PropelException;

/**
 * Base class that represents a query for the 'round' table.
 *
 * 
 *
 * @method     ChildRoundQuery orderById($order = Criteria::ASC) Order by the id column
 * @method     ChildRoundQuery orderByLayoutId($order = Criteria::ASC) Order by the layout_id column
 * @method     ChildRoundQuery orderByStarttime($order = Criteria::ASC) Order by the starttime column
 * @method     ChildRoundQuery orderByEndtime($order = Criteria::ASC) Order by the endtime column
 * @method     ChildRoundQuery orderByUserId($order = Criteria::ASC) Order by the user_id column
 *
 * @method     ChildRoundQuery groupById() Group by the id column
 * @method     ChildRoundQuery groupByLayoutId() Group by the layout_id column
 * @method     ChildRoundQuery groupByStarttime() Group by the starttime column
 * @method     ChildRoundQuery groupByEndtime() Group by the endtime column
 * @method     ChildRoundQuery groupByUserId() Group by the user_id column
 *
 * @method     ChildRoundQuery leftJoin($relation) Adds a LEFT JOIN clause to the query
 * @method     ChildRoundQuery rightJoin($relation) Adds a RIGHT JOIN clause to the query
 * @method     ChildRoundQuery innerJoin($relation) Adds a INNER JOIN clause to the query
 *
 * @method     ChildRoundQuery leftJoinWith($relation) Adds a LEFT JOIN clause and with to the query
 * @method     ChildRoundQuery rightJoinWith($relation) Adds a RIGHT JOIN clause and with to the query
 * @method     ChildRoundQuery innerJoinWith($relation) Adds a INNER JOIN clause and with to the query
 *
 * @method     ChildRoundQuery leftJoinLayout($relationAlias = null) Adds a LEFT JOIN clause to the query using the Layout relation
 * @method     ChildRoundQuery rightJoinLayout($relationAlias = null) Adds a RIGHT JOIN clause to the query using the Layout relation
 * @method     ChildRoundQuery innerJoinLayout($relationAlias = null) Adds a INNER JOIN clause to the query using the Layout relation
 *
 * @method     ChildRoundQuery joinWithLayout($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the Layout relation
 *
 * @method     ChildRoundQuery leftJoinWithLayout() Adds a LEFT JOIN clause and with to the query using the Layout relation
 * @method     ChildRoundQuery rightJoinWithLayout() Adds a RIGHT JOIN clause and with to the query using the Layout relation
 * @method     ChildRoundQuery innerJoinWithLayout() Adds a INNER JOIN clause and with to the query using the Layout relation
 *
 * @method     ChildRoundQuery leftJoinUser($relationAlias = null) Adds a LEFT JOIN clause to the query using the User relation
 * @method     ChildRoundQuery rightJoinUser($relationAlias = null) Adds a RIGHT JOIN clause to the query using the User relation
 * @method     ChildRoundQuery innerJoinUser($relationAlias = null) Adds a INNER JOIN clause to the query using the User relation
 *
 * @method     ChildRoundQuery joinWithUser($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the User relation
 *
 * @method     ChildRoundQuery leftJoinWithUser() Adds a LEFT JOIN clause and with to the query using the User relation
 * @method     ChildRoundQuery rightJoinWithUser() Adds a RIGHT JOIN clause and with to the query using the User relation
 * @method     ChildRoundQuery innerJoinWithUser() Adds a INNER JOIN clause and with to the query using the User relation
 *
 * @method     ChildRoundQuery leftJoinRoundFairway($relationAlias = null) Adds a LEFT JOIN clause to the query using the RoundFairway relation
 * @method     ChildRoundQuery rightJoinRoundFairway($relationAlias = null) Adds a RIGHT JOIN clause to the query using the RoundFairway relation
 * @method     ChildRoundQuery innerJoinRoundFairway($relationAlias = null) Adds a INNER JOIN clause to the query using the RoundFairway relation
 *
 * @method     ChildRoundQuery joinWithRoundFairway($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the RoundFairway relation
 *
 * @method     ChildRoundQuery leftJoinWithRoundFairway() Adds a LEFT JOIN clause and with to the query using the RoundFairway relation
 * @method     ChildRoundQuery rightJoinWithRoundFairway() Adds a RIGHT JOIN clause and with to the query using the RoundFairway relation
 * @method     ChildRoundQuery innerJoinWithRoundFairway() Adds a INNER JOIN clause and with to the query using the RoundFairway relation
 *
 * @method     \Moz\LayoutQuery|\Moz\UserQuery|\Moz\RoundFairwayQuery endUse() Finalizes a secondary criteria and merges it with its primary Criteria
 *
 * @method     ChildRound findOne(ConnectionInterface $con = null) Return the first ChildRound matching the query
 * @method     ChildRound findOneOrCreate(ConnectionInterface $con = null) Return the first ChildRound matching the query, or a new ChildRound object populated from the query conditions when no match is found
 *
 * @method     ChildRound findOneById(int $id) Return the first ChildRound filtered by the id column
 * @method     ChildRound findOneByLayoutId(int $layout_id) Return the first ChildRound filtered by the layout_id column
 * @method     ChildRound findOneByStarttime(string $starttime) Return the first ChildRound filtered by the starttime column
 * @method     ChildRound findOneByEndtime(string $endtime) Return the first ChildRound filtered by the endtime column
 * @method     ChildRound findOneByUserId(int $user_id) Return the first ChildRound filtered by the user_id column *

 * @method     ChildRound requirePk($key, ConnectionInterface $con = null) Return the ChildRound by primary key and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildRound requireOne(ConnectionInterface $con = null) Return the first ChildRound matching the query and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildRound requireOneById(int $id) Return the first ChildRound filtered by the id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildRound requireOneByLayoutId(int $layout_id) Return the first ChildRound filtered by the layout_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildRound requireOneByStarttime(string $starttime) Return the first ChildRound filtered by the starttime column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildRound requireOneByEndtime(string $endtime) Return the first ChildRound filtered by the endtime column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildRound requireOneByUserId(int $user_id) Return the first ChildRound filtered by the user_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildRound[]|ObjectCollection find(ConnectionInterface $con = null) Return ChildRound objects based on current ModelCriteria
 * @method     ChildRound[]|ObjectCollection findById(int $id) Return ChildRound objects filtered by the id column
 * @method     ChildRound[]|ObjectCollection findByLayoutId(int $layout_id) Return ChildRound objects filtered by the layout_id column
 * @method     ChildRound[]|ObjectCollection findByStarttime(string $starttime) Return ChildRound objects filtered by the starttime column
 * @method     ChildRound[]|ObjectCollection findByEndtime(string $endtime) Return ChildRound objects filtered by the endtime column
 * @method     ChildRound[]|ObjectCollection findByUserId(int $user_id) Return ChildRound objects filtered by the user_id column
 * @method     ChildRound[]|\Propel\Runtime\Util\PropelModelPager paginate($page = 1, $maxPerPage = 10, ConnectionInterface $con = null) Issue a SELECT query based on the current ModelCriteria and uses a page and a maximum number of results per page to compute an offset and a limit
 *
 */
abstract class RoundQuery extends ModelCriteria
{
    protected $entityNotFoundExceptionClass = '\\Propel\\Runtime\\Exception\\EntityNotFoundException';

    /**
     * Initializes internal state of \Moz\Base\RoundQuery object.
     *
     * @param     string $dbName The database name
     * @param     string $modelName The phpName of a model, e.g. 'Book'
     * @param     string $modelAlias The alias for the model in this query, e.g. 'b'
     */
    public function __construct($dbName = 'default', $modelName = '\\Moz\\Round', $modelAlias = null)
    {
        parent::__construct($dbName, $modelName, $modelAlias);
    }

    /**
     * Returns a new ChildRoundQuery object.
     *
     * @param     string $modelAlias The alias of a model in the query
     * @param     Criteria $criteria Optional Criteria to build the query from
     *
     * @return ChildRoundQuery
     */
    public static function create($modelAlias = null, Criteria $criteria = null)
    {
        if ($criteria instanceof ChildRoundQuery) {
            return $criteria;
        }
        $query = new ChildRoundQuery();
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
     * $obj  = $c->findPk(12, $con);
     * </code>
     *
     * @param mixed $key Primary key to use for the query
     * @param ConnectionInterface $con an optional connection object
     *
     * @return ChildRound|array|mixed the result, formatted by the current formatter
     */
    public function findPk($key, ConnectionInterface $con = null)
    {
        if ($key === null) {
            return null;
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getReadConnection(RoundTableMap::DATABASE_NAME);
        }

        $this->basePreSelect($con);

        if (
            $this->formatter || $this->modelAlias || $this->with || $this->select
            || $this->selectColumns || $this->asColumns || $this->selectModifiers
            || $this->map || $this->having || $this->joins
        ) {
            return $this->findPkComplex($key, $con);
        }

        if ((null !== ($obj = RoundTableMap::getInstanceFromPool(null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key)))) {
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
     * @return ChildRound A model object, or null if the key is not found
     */
    protected function findPkSimple($key, ConnectionInterface $con)
    {
        $sql = 'SELECT id, layout_id, starttime, endtime, user_id FROM round WHERE id = :p0';
        try {
            $stmt = $con->prepare($sql);            
            $stmt->bindValue(':p0', $key, PDO::PARAM_INT);
            $stmt->execute();
        } catch (Exception $e) {
            Propel::log($e->getMessage(), Propel::LOG_ERR);
            throw new PropelException(sprintf('Unable to execute SELECT statement [%s]', $sql), 0, $e);
        }
        $obj = null;
        if ($row = $stmt->fetch(\PDO::FETCH_NUM)) {
            /** @var ChildRound $obj */
            $obj = new ChildRound();
            $obj->hydrate($row);
            RoundTableMap::addInstanceToPool($obj, null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key);
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
     * @return ChildRound|array|mixed the result, formatted by the current formatter
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
     * $objs = $c->findPks(array(12, 56, 832), $con);
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
     * @return $this|ChildRoundQuery The current query, for fluid interface
     */
    public function filterByPrimaryKey($key)
    {

        return $this->addUsingAlias(RoundTableMap::COL_ID, $key, Criteria::EQUAL);
    }

    /**
     * Filter the query by a list of primary keys
     *
     * @param     array $keys The list of primary key to use for the query
     *
     * @return $this|ChildRoundQuery The current query, for fluid interface
     */
    public function filterByPrimaryKeys($keys)
    {

        return $this->addUsingAlias(RoundTableMap::COL_ID, $keys, Criteria::IN);
    }

    /**
     * Filter the query on the id column
     *
     * Example usage:
     * <code>
     * $query->filterById(1234); // WHERE id = 1234
     * $query->filterById(array(12, 34)); // WHERE id IN (12, 34)
     * $query->filterById(array('min' => 12)); // WHERE id > 12
     * </code>
     *
     * @param     mixed $id The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildRoundQuery The current query, for fluid interface
     */
    public function filterById($id = null, $comparison = null)
    {
        if (is_array($id)) {
            $useMinMax = false;
            if (isset($id['min'])) {
                $this->addUsingAlias(RoundTableMap::COL_ID, $id['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($id['max'])) {
                $this->addUsingAlias(RoundTableMap::COL_ID, $id['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(RoundTableMap::COL_ID, $id, $comparison);
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
     * @return $this|ChildRoundQuery The current query, for fluid interface
     */
    public function filterByLayoutId($layoutId = null, $comparison = null)
    {
        if (is_array($layoutId)) {
            $useMinMax = false;
            if (isset($layoutId['min'])) {
                $this->addUsingAlias(RoundTableMap::COL_LAYOUT_ID, $layoutId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($layoutId['max'])) {
                $this->addUsingAlias(RoundTableMap::COL_LAYOUT_ID, $layoutId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(RoundTableMap::COL_LAYOUT_ID, $layoutId, $comparison);
    }

    /**
     * Filter the query on the starttime column
     *
     * Example usage:
     * <code>
     * $query->filterByStarttime('2011-03-14'); // WHERE starttime = '2011-03-14'
     * $query->filterByStarttime('now'); // WHERE starttime = '2011-03-14'
     * $query->filterByStarttime(array('max' => 'yesterday')); // WHERE starttime > '2011-03-13'
     * </code>
     *
     * @param     mixed $starttime The value to use as filter.
     *              Values can be integers (unix timestamps), DateTime objects, or strings.
     *              Empty strings are treated as NULL.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildRoundQuery The current query, for fluid interface
     */
    public function filterByStarttime($starttime = null, $comparison = null)
    {
        if (is_array($starttime)) {
            $useMinMax = false;
            if (isset($starttime['min'])) {
                $this->addUsingAlias(RoundTableMap::COL_STARTTIME, $starttime['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($starttime['max'])) {
                $this->addUsingAlias(RoundTableMap::COL_STARTTIME, $starttime['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(RoundTableMap::COL_STARTTIME, $starttime, $comparison);
    }

    /**
     * Filter the query on the endtime column
     *
     * Example usage:
     * <code>
     * $query->filterByEndtime('2011-03-14'); // WHERE endtime = '2011-03-14'
     * $query->filterByEndtime('now'); // WHERE endtime = '2011-03-14'
     * $query->filterByEndtime(array('max' => 'yesterday')); // WHERE endtime > '2011-03-13'
     * </code>
     *
     * @param     mixed $endtime The value to use as filter.
     *              Values can be integers (unix timestamps), DateTime objects, or strings.
     *              Empty strings are treated as NULL.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildRoundQuery The current query, for fluid interface
     */
    public function filterByEndtime($endtime = null, $comparison = null)
    {
        if (is_array($endtime)) {
            $useMinMax = false;
            if (isset($endtime['min'])) {
                $this->addUsingAlias(RoundTableMap::COL_ENDTIME, $endtime['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($endtime['max'])) {
                $this->addUsingAlias(RoundTableMap::COL_ENDTIME, $endtime['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(RoundTableMap::COL_ENDTIME, $endtime, $comparison);
    }

    /**
     * Filter the query on the user_id column
     *
     * Example usage:
     * <code>
     * $query->filterByUserId(1234); // WHERE user_id = 1234
     * $query->filterByUserId(array(12, 34)); // WHERE user_id IN (12, 34)
     * $query->filterByUserId(array('min' => 12)); // WHERE user_id > 12
     * </code>
     *
     * @see       filterByUser()
     *
     * @param     mixed $userId The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildRoundQuery The current query, for fluid interface
     */
    public function filterByUserId($userId = null, $comparison = null)
    {
        if (is_array($userId)) {
            $useMinMax = false;
            if (isset($userId['min'])) {
                $this->addUsingAlias(RoundTableMap::COL_USER_ID, $userId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($userId['max'])) {
                $this->addUsingAlias(RoundTableMap::COL_USER_ID, $userId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(RoundTableMap::COL_USER_ID, $userId, $comparison);
    }

    /**
     * Filter the query by a related \Moz\Layout object
     *
     * @param \Moz\Layout|ObjectCollection $layout The related object(s) to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildRoundQuery The current query, for fluid interface
     */
    public function filterByLayout($layout, $comparison = null)
    {
        if ($layout instanceof \Moz\Layout) {
            return $this
                ->addUsingAlias(RoundTableMap::COL_LAYOUT_ID, $layout->getId(), $comparison);
        } elseif ($layout instanceof ObjectCollection) {
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }

            return $this
                ->addUsingAlias(RoundTableMap::COL_LAYOUT_ID, $layout->toKeyValue('PrimaryKey', 'Id'), $comparison);
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
     * @return $this|ChildRoundQuery The current query, for fluid interface
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
     * Filter the query by a related \Moz\User object
     *
     * @param \Moz\User|ObjectCollection $user The related object(s) to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildRoundQuery The current query, for fluid interface
     */
    public function filterByUser($user, $comparison = null)
    {
        if ($user instanceof \Moz\User) {
            return $this
                ->addUsingAlias(RoundTableMap::COL_USER_ID, $user->getId(), $comparison);
        } elseif ($user instanceof ObjectCollection) {
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }

            return $this
                ->addUsingAlias(RoundTableMap::COL_USER_ID, $user->toKeyValue('PrimaryKey', 'Id'), $comparison);
        } else {
            throw new PropelException('filterByUser() only accepts arguments of type \Moz\User or Collection');
        }
    }

    /**
     * Adds a JOIN clause to the query using the User relation
     *
     * @param     string $relationAlias optional alias for the relation
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return $this|ChildRoundQuery The current query, for fluid interface
     */
    public function joinUser($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        $tableMap = $this->getTableMap();
        $relationMap = $tableMap->getRelation('User');

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
            $this->addJoinObject($join, 'User');
        }

        return $this;
    }

    /**
     * Use the User relation User object
     *
     * @see useQuery()
     *
     * @param     string $relationAlias optional alias for the relation,
     *                                   to be used as main alias in the secondary query
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return \Moz\UserQuery A secondary query class using the current class as primary query
     */
    public function useUserQuery($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        return $this
            ->joinUser($relationAlias, $joinType)
            ->useQuery($relationAlias ? $relationAlias : 'User', '\Moz\UserQuery');
    }

    /**
     * Filter the query by a related \Moz\RoundFairway object
     *
     * @param \Moz\RoundFairway|ObjectCollection $roundFairway the related object to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return ChildRoundQuery The current query, for fluid interface
     */
    public function filterByRoundFairway($roundFairway, $comparison = null)
    {
        if ($roundFairway instanceof \Moz\RoundFairway) {
            return $this
                ->addUsingAlias(RoundTableMap::COL_ID, $roundFairway->getRoundId(), $comparison);
        } elseif ($roundFairway instanceof ObjectCollection) {
            return $this
                ->useRoundFairwayQuery()
                ->filterByPrimaryKeys($roundFairway->getPrimaryKeys())
                ->endUse();
        } else {
            throw new PropelException('filterByRoundFairway() only accepts arguments of type \Moz\RoundFairway or Collection');
        }
    }

    /**
     * Adds a JOIN clause to the query using the RoundFairway relation
     *
     * @param     string $relationAlias optional alias for the relation
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return $this|ChildRoundQuery The current query, for fluid interface
     */
    public function joinRoundFairway($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        $tableMap = $this->getTableMap();
        $relationMap = $tableMap->getRelation('RoundFairway');

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
            $this->addJoinObject($join, 'RoundFairway');
        }

        return $this;
    }

    /**
     * Use the RoundFairway relation RoundFairway object
     *
     * @see useQuery()
     *
     * @param     string $relationAlias optional alias for the relation,
     *                                   to be used as main alias in the secondary query
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return \Moz\RoundFairwayQuery A secondary query class using the current class as primary query
     */
    public function useRoundFairwayQuery($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        return $this
            ->joinRoundFairway($relationAlias, $joinType)
            ->useQuery($relationAlias ? $relationAlias : 'RoundFairway', '\Moz\RoundFairwayQuery');
    }

    /**
     * Exclude object from result
     *
     * @param   ChildRound $round Object to remove from the list of results
     *
     * @return $this|ChildRoundQuery The current query, for fluid interface
     */
    public function prune($round = null)
    {
        if ($round) {
            $this->addUsingAlias(RoundTableMap::COL_ID, $round->getId(), Criteria::NOT_EQUAL);
        }

        return $this;
    }

    /**
     * Deletes all rows from the round table.
     *
     * @param ConnectionInterface $con the connection to use
     * @return int The number of affected rows (if supported by underlying database driver).
     */
    public function doDeleteAll(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(RoundTableMap::DATABASE_NAME);
        }

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            $affectedRows += parent::doDeleteAll($con);
            // Because this db requires some delete cascade/set null emulation, we have to
            // clear the cached instance *after* the emulation has happened (since
            // instances get re-added by the select statement contained therein).
            RoundTableMap::clearInstancePool();
            RoundTableMap::clearRelatedInstancePool();

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
            $con = Propel::getServiceContainer()->getWriteConnection(RoundTableMap::DATABASE_NAME);
        }

        $criteria = $this;

        // Set the correct dbName
        $criteria->setDbName(RoundTableMap::DATABASE_NAME);

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con, $criteria) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            
            RoundTableMap::removeInstanceFromPool($criteria);
        
            $affectedRows += ModelCriteria::delete($con);
            RoundTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

} // RoundQuery
