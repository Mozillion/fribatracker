<?php

namespace Moz\Base;

use \Exception;
use \PDO;
use Moz\Player as ChildPlayer;
use Moz\PlayerQuery as ChildPlayerQuery;
use Moz\Map\PlayerTableMap;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\ModelCriteria;
use Propel\Runtime\ActiveQuery\ModelJoin;
use Propel\Runtime\Collection\ObjectCollection;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Exception\PropelException;

/**
 * Base class that represents a query for the 'player' table.
 *
 * 
 *
 * @method     ChildPlayerQuery orderById($order = Criteria::ASC) Order by the id column
 * @method     ChildPlayerQuery orderByFirstName($order = Criteria::ASC) Order by the first_name column
 * @method     ChildPlayerQuery orderByLastName($order = Criteria::ASC) Order by the last_name column
 * @method     ChildPlayerQuery orderByTimeCreated($order = Criteria::ASC) Order by the time_created column
 * @method     ChildPlayerQuery orderByCreatedByUserId($order = Criteria::ASC) Order by the created_by_user_id column
 *
 * @method     ChildPlayerQuery groupById() Group by the id column
 * @method     ChildPlayerQuery groupByFirstName() Group by the first_name column
 * @method     ChildPlayerQuery groupByLastName() Group by the last_name column
 * @method     ChildPlayerQuery groupByTimeCreated() Group by the time_created column
 * @method     ChildPlayerQuery groupByCreatedByUserId() Group by the created_by_user_id column
 *
 * @method     ChildPlayerQuery leftJoin($relation) Adds a LEFT JOIN clause to the query
 * @method     ChildPlayerQuery rightJoin($relation) Adds a RIGHT JOIN clause to the query
 * @method     ChildPlayerQuery innerJoin($relation) Adds a INNER JOIN clause to the query
 *
 * @method     ChildPlayerQuery leftJoinWith($relation) Adds a LEFT JOIN clause and with to the query
 * @method     ChildPlayerQuery rightJoinWith($relation) Adds a RIGHT JOIN clause and with to the query
 * @method     ChildPlayerQuery innerJoinWith($relation) Adds a INNER JOIN clause and with to the query
 *
 * @method     ChildPlayerQuery leftJoinUserRelatedByCreatedByUserId($relationAlias = null) Adds a LEFT JOIN clause to the query using the UserRelatedByCreatedByUserId relation
 * @method     ChildPlayerQuery rightJoinUserRelatedByCreatedByUserId($relationAlias = null) Adds a RIGHT JOIN clause to the query using the UserRelatedByCreatedByUserId relation
 * @method     ChildPlayerQuery innerJoinUserRelatedByCreatedByUserId($relationAlias = null) Adds a INNER JOIN clause to the query using the UserRelatedByCreatedByUserId relation
 *
 * @method     ChildPlayerQuery joinWithUserRelatedByCreatedByUserId($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the UserRelatedByCreatedByUserId relation
 *
 * @method     ChildPlayerQuery leftJoinWithUserRelatedByCreatedByUserId() Adds a LEFT JOIN clause and with to the query using the UserRelatedByCreatedByUserId relation
 * @method     ChildPlayerQuery rightJoinWithUserRelatedByCreatedByUserId() Adds a RIGHT JOIN clause and with to the query using the UserRelatedByCreatedByUserId relation
 * @method     ChildPlayerQuery innerJoinWithUserRelatedByCreatedByUserId() Adds a INNER JOIN clause and with to the query using the UserRelatedByCreatedByUserId relation
 *
 * @method     ChildPlayerQuery leftJoinUserRelatedByPlayerId($relationAlias = null) Adds a LEFT JOIN clause to the query using the UserRelatedByPlayerId relation
 * @method     ChildPlayerQuery rightJoinUserRelatedByPlayerId($relationAlias = null) Adds a RIGHT JOIN clause to the query using the UserRelatedByPlayerId relation
 * @method     ChildPlayerQuery innerJoinUserRelatedByPlayerId($relationAlias = null) Adds a INNER JOIN clause to the query using the UserRelatedByPlayerId relation
 *
 * @method     ChildPlayerQuery joinWithUserRelatedByPlayerId($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the UserRelatedByPlayerId relation
 *
 * @method     ChildPlayerQuery leftJoinWithUserRelatedByPlayerId() Adds a LEFT JOIN clause and with to the query using the UserRelatedByPlayerId relation
 * @method     ChildPlayerQuery rightJoinWithUserRelatedByPlayerId() Adds a RIGHT JOIN clause and with to the query using the UserRelatedByPlayerId relation
 * @method     ChildPlayerQuery innerJoinWithUserRelatedByPlayerId() Adds a INNER JOIN clause and with to the query using the UserRelatedByPlayerId relation
 *
 * @method     ChildPlayerQuery leftJoinRoundFairway($relationAlias = null) Adds a LEFT JOIN clause to the query using the RoundFairway relation
 * @method     ChildPlayerQuery rightJoinRoundFairway($relationAlias = null) Adds a RIGHT JOIN clause to the query using the RoundFairway relation
 * @method     ChildPlayerQuery innerJoinRoundFairway($relationAlias = null) Adds a INNER JOIN clause to the query using the RoundFairway relation
 *
 * @method     ChildPlayerQuery joinWithRoundFairway($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the RoundFairway relation
 *
 * @method     ChildPlayerQuery leftJoinWithRoundFairway() Adds a LEFT JOIN clause and with to the query using the RoundFairway relation
 * @method     ChildPlayerQuery rightJoinWithRoundFairway() Adds a RIGHT JOIN clause and with to the query using the RoundFairway relation
 * @method     ChildPlayerQuery innerJoinWithRoundFairway() Adds a INNER JOIN clause and with to the query using the RoundFairway relation
 *
 * @method     \Moz\UserQuery|\Moz\RoundFairwayQuery endUse() Finalizes a secondary criteria and merges it with its primary Criteria
 *
 * @method     ChildPlayer findOne(ConnectionInterface $con = null) Return the first ChildPlayer matching the query
 * @method     ChildPlayer findOneOrCreate(ConnectionInterface $con = null) Return the first ChildPlayer matching the query, or a new ChildPlayer object populated from the query conditions when no match is found
 *
 * @method     ChildPlayer findOneById(int $id) Return the first ChildPlayer filtered by the id column
 * @method     ChildPlayer findOneByFirstName(string $first_name) Return the first ChildPlayer filtered by the first_name column
 * @method     ChildPlayer findOneByLastName(string $last_name) Return the first ChildPlayer filtered by the last_name column
 * @method     ChildPlayer findOneByTimeCreated(string $time_created) Return the first ChildPlayer filtered by the time_created column
 * @method     ChildPlayer findOneByCreatedByUserId(int $created_by_user_id) Return the first ChildPlayer filtered by the created_by_user_id column *

 * @method     ChildPlayer requirePk($key, ConnectionInterface $con = null) Return the ChildPlayer by primary key and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPlayer requireOne(ConnectionInterface $con = null) Return the first ChildPlayer matching the query and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildPlayer requireOneById(int $id) Return the first ChildPlayer filtered by the id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPlayer requireOneByFirstName(string $first_name) Return the first ChildPlayer filtered by the first_name column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPlayer requireOneByLastName(string $last_name) Return the first ChildPlayer filtered by the last_name column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPlayer requireOneByTimeCreated(string $time_created) Return the first ChildPlayer filtered by the time_created column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildPlayer requireOneByCreatedByUserId(int $created_by_user_id) Return the first ChildPlayer filtered by the created_by_user_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildPlayer[]|ObjectCollection find(ConnectionInterface $con = null) Return ChildPlayer objects based on current ModelCriteria
 * @method     ChildPlayer[]|ObjectCollection findById(int $id) Return ChildPlayer objects filtered by the id column
 * @method     ChildPlayer[]|ObjectCollection findByFirstName(string $first_name) Return ChildPlayer objects filtered by the first_name column
 * @method     ChildPlayer[]|ObjectCollection findByLastName(string $last_name) Return ChildPlayer objects filtered by the last_name column
 * @method     ChildPlayer[]|ObjectCollection findByTimeCreated(string $time_created) Return ChildPlayer objects filtered by the time_created column
 * @method     ChildPlayer[]|ObjectCollection findByCreatedByUserId(int $created_by_user_id) Return ChildPlayer objects filtered by the created_by_user_id column
 * @method     ChildPlayer[]|\Propel\Runtime\Util\PropelModelPager paginate($page = 1, $maxPerPage = 10, ConnectionInterface $con = null) Issue a SELECT query based on the current ModelCriteria and uses a page and a maximum number of results per page to compute an offset and a limit
 *
 */
abstract class PlayerQuery extends ModelCriteria
{
    protected $entityNotFoundExceptionClass = '\\Propel\\Runtime\\Exception\\EntityNotFoundException';

    /**
     * Initializes internal state of \Moz\Base\PlayerQuery object.
     *
     * @param     string $dbName The database name
     * @param     string $modelName The phpName of a model, e.g. 'Book'
     * @param     string $modelAlias The alias for the model in this query, e.g. 'b'
     */
    public function __construct($dbName = 'default', $modelName = '\\Moz\\Player', $modelAlias = null)
    {
        parent::__construct($dbName, $modelName, $modelAlias);
    }

    /**
     * Returns a new ChildPlayerQuery object.
     *
     * @param     string $modelAlias The alias of a model in the query
     * @param     Criteria $criteria Optional Criteria to build the query from
     *
     * @return ChildPlayerQuery
     */
    public static function create($modelAlias = null, Criteria $criteria = null)
    {
        if ($criteria instanceof ChildPlayerQuery) {
            return $criteria;
        }
        $query = new ChildPlayerQuery();
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
     * @return ChildPlayer|array|mixed the result, formatted by the current formatter
     */
    public function findPk($key, ConnectionInterface $con = null)
    {
        if ($key === null) {
            return null;
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getReadConnection(PlayerTableMap::DATABASE_NAME);
        }

        $this->basePreSelect($con);

        if (
            $this->formatter || $this->modelAlias || $this->with || $this->select
            || $this->selectColumns || $this->asColumns || $this->selectModifiers
            || $this->map || $this->having || $this->joins
        ) {
            return $this->findPkComplex($key, $con);
        }

        if ((null !== ($obj = PlayerTableMap::getInstanceFromPool(null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key)))) {
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
     * @return ChildPlayer A model object, or null if the key is not found
     */
    protected function findPkSimple($key, ConnectionInterface $con)
    {
        $sql = 'SELECT id, first_name, last_name, time_created, created_by_user_id FROM player WHERE id = :p0';
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
            /** @var ChildPlayer $obj */
            $obj = new ChildPlayer();
            $obj->hydrate($row);
            PlayerTableMap::addInstanceToPool($obj, null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key);
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
     * @return ChildPlayer|array|mixed the result, formatted by the current formatter
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
     * @return $this|ChildPlayerQuery The current query, for fluid interface
     */
    public function filterByPrimaryKey($key)
    {

        return $this->addUsingAlias(PlayerTableMap::COL_ID, $key, Criteria::EQUAL);
    }

    /**
     * Filter the query by a list of primary keys
     *
     * @param     array $keys The list of primary key to use for the query
     *
     * @return $this|ChildPlayerQuery The current query, for fluid interface
     */
    public function filterByPrimaryKeys($keys)
    {

        return $this->addUsingAlias(PlayerTableMap::COL_ID, $keys, Criteria::IN);
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
     * @return $this|ChildPlayerQuery The current query, for fluid interface
     */
    public function filterById($id = null, $comparison = null)
    {
        if (is_array($id)) {
            $useMinMax = false;
            if (isset($id['min'])) {
                $this->addUsingAlias(PlayerTableMap::COL_ID, $id['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($id['max'])) {
                $this->addUsingAlias(PlayerTableMap::COL_ID, $id['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(PlayerTableMap::COL_ID, $id, $comparison);
    }

    /**
     * Filter the query on the first_name column
     *
     * Example usage:
     * <code>
     * $query->filterByFirstName('fooValue');   // WHERE first_name = 'fooValue'
     * $query->filterByFirstName('%fooValue%'); // WHERE first_name LIKE '%fooValue%'
     * </code>
     *
     * @param     string $firstName The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE)
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildPlayerQuery The current query, for fluid interface
     */
    public function filterByFirstName($firstName = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($firstName)) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(PlayerTableMap::COL_FIRST_NAME, $firstName, $comparison);
    }

    /**
     * Filter the query on the last_name column
     *
     * Example usage:
     * <code>
     * $query->filterByLastName('fooValue');   // WHERE last_name = 'fooValue'
     * $query->filterByLastName('%fooValue%'); // WHERE last_name LIKE '%fooValue%'
     * </code>
     *
     * @param     string $lastName The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE)
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildPlayerQuery The current query, for fluid interface
     */
    public function filterByLastName($lastName = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($lastName)) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(PlayerTableMap::COL_LAST_NAME, $lastName, $comparison);
    }

    /**
     * Filter the query on the time_created column
     *
     * Example usage:
     * <code>
     * $query->filterByTimeCreated('2011-03-14'); // WHERE time_created = '2011-03-14'
     * $query->filterByTimeCreated('now'); // WHERE time_created = '2011-03-14'
     * $query->filterByTimeCreated(array('max' => 'yesterday')); // WHERE time_created > '2011-03-13'
     * </code>
     *
     * @param     mixed $timeCreated The value to use as filter.
     *              Values can be integers (unix timestamps), DateTime objects, or strings.
     *              Empty strings are treated as NULL.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildPlayerQuery The current query, for fluid interface
     */
    public function filterByTimeCreated($timeCreated = null, $comparison = null)
    {
        if (is_array($timeCreated)) {
            $useMinMax = false;
            if (isset($timeCreated['min'])) {
                $this->addUsingAlias(PlayerTableMap::COL_TIME_CREATED, $timeCreated['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($timeCreated['max'])) {
                $this->addUsingAlias(PlayerTableMap::COL_TIME_CREATED, $timeCreated['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(PlayerTableMap::COL_TIME_CREATED, $timeCreated, $comparison);
    }

    /**
     * Filter the query on the created_by_user_id column
     *
     * Example usage:
     * <code>
     * $query->filterByCreatedByUserId(1234); // WHERE created_by_user_id = 1234
     * $query->filterByCreatedByUserId(array(12, 34)); // WHERE created_by_user_id IN (12, 34)
     * $query->filterByCreatedByUserId(array('min' => 12)); // WHERE created_by_user_id > 12
     * </code>
     *
     * @see       filterByUserRelatedByCreatedByUserId()
     *
     * @param     mixed $createdByUserId The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildPlayerQuery The current query, for fluid interface
     */
    public function filterByCreatedByUserId($createdByUserId = null, $comparison = null)
    {
        if (is_array($createdByUserId)) {
            $useMinMax = false;
            if (isset($createdByUserId['min'])) {
                $this->addUsingAlias(PlayerTableMap::COL_CREATED_BY_USER_ID, $createdByUserId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($createdByUserId['max'])) {
                $this->addUsingAlias(PlayerTableMap::COL_CREATED_BY_USER_ID, $createdByUserId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(PlayerTableMap::COL_CREATED_BY_USER_ID, $createdByUserId, $comparison);
    }

    /**
     * Filter the query by a related \Moz\User object
     *
     * @param \Moz\User|ObjectCollection $user The related object(s) to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildPlayerQuery The current query, for fluid interface
     */
    public function filterByUserRelatedByCreatedByUserId($user, $comparison = null)
    {
        if ($user instanceof \Moz\User) {
            return $this
                ->addUsingAlias(PlayerTableMap::COL_CREATED_BY_USER_ID, $user->getId(), $comparison);
        } elseif ($user instanceof ObjectCollection) {
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }

            return $this
                ->addUsingAlias(PlayerTableMap::COL_CREATED_BY_USER_ID, $user->toKeyValue('PrimaryKey', 'Id'), $comparison);
        } else {
            throw new PropelException('filterByUserRelatedByCreatedByUserId() only accepts arguments of type \Moz\User or Collection');
        }
    }

    /**
     * Adds a JOIN clause to the query using the UserRelatedByCreatedByUserId relation
     *
     * @param     string $relationAlias optional alias for the relation
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return $this|ChildPlayerQuery The current query, for fluid interface
     */
    public function joinUserRelatedByCreatedByUserId($relationAlias = null, $joinType = Criteria::LEFT_JOIN)
    {
        $tableMap = $this->getTableMap();
        $relationMap = $tableMap->getRelation('UserRelatedByCreatedByUserId');

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
            $this->addJoinObject($join, 'UserRelatedByCreatedByUserId');
        }

        return $this;
    }

    /**
     * Use the UserRelatedByCreatedByUserId relation User object
     *
     * @see useQuery()
     *
     * @param     string $relationAlias optional alias for the relation,
     *                                   to be used as main alias in the secondary query
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return \Moz\UserQuery A secondary query class using the current class as primary query
     */
    public function useUserRelatedByCreatedByUserIdQuery($relationAlias = null, $joinType = Criteria::LEFT_JOIN)
    {
        return $this
            ->joinUserRelatedByCreatedByUserId($relationAlias, $joinType)
            ->useQuery($relationAlias ? $relationAlias : 'UserRelatedByCreatedByUserId', '\Moz\UserQuery');
    }

    /**
     * Filter the query by a related \Moz\User object
     *
     * @param \Moz\User|ObjectCollection $user the related object to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return ChildPlayerQuery The current query, for fluid interface
     */
    public function filterByUserRelatedByPlayerId($user, $comparison = null)
    {
        if ($user instanceof \Moz\User) {
            return $this
                ->addUsingAlias(PlayerTableMap::COL_ID, $user->getPlayerId(), $comparison);
        } elseif ($user instanceof ObjectCollection) {
            return $this
                ->useUserRelatedByPlayerIdQuery()
                ->filterByPrimaryKeys($user->getPrimaryKeys())
                ->endUse();
        } else {
            throw new PropelException('filterByUserRelatedByPlayerId() only accepts arguments of type \Moz\User or Collection');
        }
    }

    /**
     * Adds a JOIN clause to the query using the UserRelatedByPlayerId relation
     *
     * @param     string $relationAlias optional alias for the relation
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return $this|ChildPlayerQuery The current query, for fluid interface
     */
    public function joinUserRelatedByPlayerId($relationAlias = null, $joinType = Criteria::LEFT_JOIN)
    {
        $tableMap = $this->getTableMap();
        $relationMap = $tableMap->getRelation('UserRelatedByPlayerId');

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
            $this->addJoinObject($join, 'UserRelatedByPlayerId');
        }

        return $this;
    }

    /**
     * Use the UserRelatedByPlayerId relation User object
     *
     * @see useQuery()
     *
     * @param     string $relationAlias optional alias for the relation,
     *                                   to be used as main alias in the secondary query
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return \Moz\UserQuery A secondary query class using the current class as primary query
     */
    public function useUserRelatedByPlayerIdQuery($relationAlias = null, $joinType = Criteria::LEFT_JOIN)
    {
        return $this
            ->joinUserRelatedByPlayerId($relationAlias, $joinType)
            ->useQuery($relationAlias ? $relationAlias : 'UserRelatedByPlayerId', '\Moz\UserQuery');
    }

    /**
     * Filter the query by a related \Moz\RoundFairway object
     *
     * @param \Moz\RoundFairway|ObjectCollection $roundFairway the related object to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return ChildPlayerQuery The current query, for fluid interface
     */
    public function filterByRoundFairway($roundFairway, $comparison = null)
    {
        if ($roundFairway instanceof \Moz\RoundFairway) {
            return $this
                ->addUsingAlias(PlayerTableMap::COL_ID, $roundFairway->getPlayerId(), $comparison);
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
     * @return $this|ChildPlayerQuery The current query, for fluid interface
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
     * @param   ChildPlayer $player Object to remove from the list of results
     *
     * @return $this|ChildPlayerQuery The current query, for fluid interface
     */
    public function prune($player = null)
    {
        if ($player) {
            $this->addUsingAlias(PlayerTableMap::COL_ID, $player->getId(), Criteria::NOT_EQUAL);
        }

        return $this;
    }

    /**
     * Deletes all rows from the player table.
     *
     * @param ConnectionInterface $con the connection to use
     * @return int The number of affected rows (if supported by underlying database driver).
     */
    public function doDeleteAll(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(PlayerTableMap::DATABASE_NAME);
        }

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            $affectedRows += parent::doDeleteAll($con);
            // Because this db requires some delete cascade/set null emulation, we have to
            // clear the cached instance *after* the emulation has happened (since
            // instances get re-added by the select statement contained therein).
            PlayerTableMap::clearInstancePool();
            PlayerTableMap::clearRelatedInstancePool();

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
            $con = Propel::getServiceContainer()->getWriteConnection(PlayerTableMap::DATABASE_NAME);
        }

        $criteria = $this;

        // Set the correct dbName
        $criteria->setDbName(PlayerTableMap::DATABASE_NAME);

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con, $criteria) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            
            PlayerTableMap::removeInstanceFromPool($criteria);
        
            $affectedRows += ModelCriteria::delete($con);
            PlayerTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

} // PlayerQuery
