<?php

namespace Moz\Base;

use \Exception;
use \PDO;
use Moz\RoundFairway as ChildRoundFairway;
use Moz\RoundFairwayQuery as ChildRoundFairwayQuery;
use Moz\Map\RoundFairwayTableMap;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\ModelCriteria;
use Propel\Runtime\ActiveQuery\ModelJoin;
use Propel\Runtime\Collection\ObjectCollection;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Exception\PropelException;

/**
 * Base class that represents a query for the 'round_fairway' table.
 *
 * 
 *
 * @method     ChildRoundFairwayQuery orderByRoundId($order = Criteria::ASC) Order by the round_id column
 * @method     ChildRoundFairwayQuery orderByFairwayId($order = Criteria::ASC) Order by the fairway_id column
 * @method     ChildRoundFairwayQuery orderByPlayerId($order = Criteria::ASC) Order by the player_id column
 * @method     ChildRoundFairwayQuery orderByPar($order = Criteria::ASC) Order by the par column
 * @method     ChildRoundFairwayQuery orderByResult($order = Criteria::ASC) Order by the result column
 *
 * @method     ChildRoundFairwayQuery groupByRoundId() Group by the round_id column
 * @method     ChildRoundFairwayQuery groupByFairwayId() Group by the fairway_id column
 * @method     ChildRoundFairwayQuery groupByPlayerId() Group by the player_id column
 * @method     ChildRoundFairwayQuery groupByPar() Group by the par column
 * @method     ChildRoundFairwayQuery groupByResult() Group by the result column
 *
 * @method     ChildRoundFairwayQuery leftJoin($relation) Adds a LEFT JOIN clause to the query
 * @method     ChildRoundFairwayQuery rightJoin($relation) Adds a RIGHT JOIN clause to the query
 * @method     ChildRoundFairwayQuery innerJoin($relation) Adds a INNER JOIN clause to the query
 *
 * @method     ChildRoundFairwayQuery leftJoinWith($relation) Adds a LEFT JOIN clause and with to the query
 * @method     ChildRoundFairwayQuery rightJoinWith($relation) Adds a RIGHT JOIN clause and with to the query
 * @method     ChildRoundFairwayQuery innerJoinWith($relation) Adds a INNER JOIN clause and with to the query
 *
 * @method     ChildRoundFairwayQuery leftJoinRound($relationAlias = null) Adds a LEFT JOIN clause to the query using the Round relation
 * @method     ChildRoundFairwayQuery rightJoinRound($relationAlias = null) Adds a RIGHT JOIN clause to the query using the Round relation
 * @method     ChildRoundFairwayQuery innerJoinRound($relationAlias = null) Adds a INNER JOIN clause to the query using the Round relation
 *
 * @method     ChildRoundFairwayQuery joinWithRound($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the Round relation
 *
 * @method     ChildRoundFairwayQuery leftJoinWithRound() Adds a LEFT JOIN clause and with to the query using the Round relation
 * @method     ChildRoundFairwayQuery rightJoinWithRound() Adds a RIGHT JOIN clause and with to the query using the Round relation
 * @method     ChildRoundFairwayQuery innerJoinWithRound() Adds a INNER JOIN clause and with to the query using the Round relation
 *
 * @method     ChildRoundFairwayQuery leftJoinFairway($relationAlias = null) Adds a LEFT JOIN clause to the query using the Fairway relation
 * @method     ChildRoundFairwayQuery rightJoinFairway($relationAlias = null) Adds a RIGHT JOIN clause to the query using the Fairway relation
 * @method     ChildRoundFairwayQuery innerJoinFairway($relationAlias = null) Adds a INNER JOIN clause to the query using the Fairway relation
 *
 * @method     ChildRoundFairwayQuery joinWithFairway($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the Fairway relation
 *
 * @method     ChildRoundFairwayQuery leftJoinWithFairway() Adds a LEFT JOIN clause and with to the query using the Fairway relation
 * @method     ChildRoundFairwayQuery rightJoinWithFairway() Adds a RIGHT JOIN clause and with to the query using the Fairway relation
 * @method     ChildRoundFairwayQuery innerJoinWithFairway() Adds a INNER JOIN clause and with to the query using the Fairway relation
 *
 * @method     ChildRoundFairwayQuery leftJoinPlayer($relationAlias = null) Adds a LEFT JOIN clause to the query using the Player relation
 * @method     ChildRoundFairwayQuery rightJoinPlayer($relationAlias = null) Adds a RIGHT JOIN clause to the query using the Player relation
 * @method     ChildRoundFairwayQuery innerJoinPlayer($relationAlias = null) Adds a INNER JOIN clause to the query using the Player relation
 *
 * @method     ChildRoundFairwayQuery joinWithPlayer($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the Player relation
 *
 * @method     ChildRoundFairwayQuery leftJoinWithPlayer() Adds a LEFT JOIN clause and with to the query using the Player relation
 * @method     ChildRoundFairwayQuery rightJoinWithPlayer() Adds a RIGHT JOIN clause and with to the query using the Player relation
 * @method     ChildRoundFairwayQuery innerJoinWithPlayer() Adds a INNER JOIN clause and with to the query using the Player relation
 *
 * @method     \Moz\RoundQuery|\Moz\FairwayQuery|\Moz\PlayerQuery endUse() Finalizes a secondary criteria and merges it with its primary Criteria
 *
 * @method     ChildRoundFairway findOne(ConnectionInterface $con = null) Return the first ChildRoundFairway matching the query
 * @method     ChildRoundFairway findOneOrCreate(ConnectionInterface $con = null) Return the first ChildRoundFairway matching the query, or a new ChildRoundFairway object populated from the query conditions when no match is found
 *
 * @method     ChildRoundFairway findOneByRoundId(int $round_id) Return the first ChildRoundFairway filtered by the round_id column
 * @method     ChildRoundFairway findOneByFairwayId(int $fairway_id) Return the first ChildRoundFairway filtered by the fairway_id column
 * @method     ChildRoundFairway findOneByPlayerId(int $player_id) Return the first ChildRoundFairway filtered by the player_id column
 * @method     ChildRoundFairway findOneByPar(int $par) Return the first ChildRoundFairway filtered by the par column
 * @method     ChildRoundFairway findOneByResult(int $result) Return the first ChildRoundFairway filtered by the result column *

 * @method     ChildRoundFairway requirePk($key, ConnectionInterface $con = null) Return the ChildRoundFairway by primary key and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildRoundFairway requireOne(ConnectionInterface $con = null) Return the first ChildRoundFairway matching the query and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildRoundFairway requireOneByRoundId(int $round_id) Return the first ChildRoundFairway filtered by the round_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildRoundFairway requireOneByFairwayId(int $fairway_id) Return the first ChildRoundFairway filtered by the fairway_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildRoundFairway requireOneByPlayerId(int $player_id) Return the first ChildRoundFairway filtered by the player_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildRoundFairway requireOneByPar(int $par) Return the first ChildRoundFairway filtered by the par column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildRoundFairway requireOneByResult(int $result) Return the first ChildRoundFairway filtered by the result column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildRoundFairway[]|ObjectCollection find(ConnectionInterface $con = null) Return ChildRoundFairway objects based on current ModelCriteria
 * @method     ChildRoundFairway[]|ObjectCollection findByRoundId(int $round_id) Return ChildRoundFairway objects filtered by the round_id column
 * @method     ChildRoundFairway[]|ObjectCollection findByFairwayId(int $fairway_id) Return ChildRoundFairway objects filtered by the fairway_id column
 * @method     ChildRoundFairway[]|ObjectCollection findByPlayerId(int $player_id) Return ChildRoundFairway objects filtered by the player_id column
 * @method     ChildRoundFairway[]|ObjectCollection findByPar(int $par) Return ChildRoundFairway objects filtered by the par column
 * @method     ChildRoundFairway[]|ObjectCollection findByResult(int $result) Return ChildRoundFairway objects filtered by the result column
 * @method     ChildRoundFairway[]|\Propel\Runtime\Util\PropelModelPager paginate($page = 1, $maxPerPage = 10, ConnectionInterface $con = null) Issue a SELECT query based on the current ModelCriteria and uses a page and a maximum number of results per page to compute an offset and a limit
 *
 */
abstract class RoundFairwayQuery extends ModelCriteria
{
    protected $entityNotFoundExceptionClass = '\\Propel\\Runtime\\Exception\\EntityNotFoundException';

    /**
     * Initializes internal state of \Moz\Base\RoundFairwayQuery object.
     *
     * @param     string $dbName The database name
     * @param     string $modelName The phpName of a model, e.g. 'Book'
     * @param     string $modelAlias The alias for the model in this query, e.g. 'b'
     */
    public function __construct($dbName = 'default', $modelName = '\\Moz\\RoundFairway', $modelAlias = null)
    {
        parent::__construct($dbName, $modelName, $modelAlias);
    }

    /**
     * Returns a new ChildRoundFairwayQuery object.
     *
     * @param     string $modelAlias The alias of a model in the query
     * @param     Criteria $criteria Optional Criteria to build the query from
     *
     * @return ChildRoundFairwayQuery
     */
    public static function create($modelAlias = null, Criteria $criteria = null)
    {
        if ($criteria instanceof ChildRoundFairwayQuery) {
            return $criteria;
        }
        $query = new ChildRoundFairwayQuery();
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
     * $obj = $c->findPk(array(12, 34, 56), $con);
     * </code>
     *
     * @param array[$round_id, $fairway_id, $player_id] $key Primary key to use for the query
     * @param ConnectionInterface $con an optional connection object
     *
     * @return ChildRoundFairway|array|mixed the result, formatted by the current formatter
     */
    public function findPk($key, ConnectionInterface $con = null)
    {
        if ($key === null) {
            return null;
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getReadConnection(RoundFairwayTableMap::DATABASE_NAME);
        }

        $this->basePreSelect($con);

        if (
            $this->formatter || $this->modelAlias || $this->with || $this->select
            || $this->selectColumns || $this->asColumns || $this->selectModifiers
            || $this->map || $this->having || $this->joins
        ) {
            return $this->findPkComplex($key, $con);
        }

        if ((null !== ($obj = RoundFairwayTableMap::getInstanceFromPool(serialize([(null === $key[0] || is_scalar($key[0]) || is_callable([$key[0], '__toString']) ? (string) $key[0] : $key[0]), (null === $key[1] || is_scalar($key[1]) || is_callable([$key[1], '__toString']) ? (string) $key[1] : $key[1]), (null === $key[2] || is_scalar($key[2]) || is_callable([$key[2], '__toString']) ? (string) $key[2] : $key[2])]))))) {
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
     * @return ChildRoundFairway A model object, or null if the key is not found
     */
    protected function findPkSimple($key, ConnectionInterface $con)
    {
        $sql = 'SELECT round_id, fairway_id, player_id, par, result FROM round_fairway WHERE round_id = :p0 AND fairway_id = :p1 AND player_id = :p2';
        try {
            $stmt = $con->prepare($sql);            
            $stmt->bindValue(':p0', $key[0], PDO::PARAM_INT);            
            $stmt->bindValue(':p1', $key[1], PDO::PARAM_INT);            
            $stmt->bindValue(':p2', $key[2], PDO::PARAM_INT);
            $stmt->execute();
        } catch (Exception $e) {
            Propel::log($e->getMessage(), Propel::LOG_ERR);
            throw new PropelException(sprintf('Unable to execute SELECT statement [%s]', $sql), 0, $e);
        }
        $obj = null;
        if ($row = $stmt->fetch(\PDO::FETCH_NUM)) {
            /** @var ChildRoundFairway $obj */
            $obj = new ChildRoundFairway();
            $obj->hydrate($row);
            RoundFairwayTableMap::addInstanceToPool($obj, serialize([(null === $key[0] || is_scalar($key[0]) || is_callable([$key[0], '__toString']) ? (string) $key[0] : $key[0]), (null === $key[1] || is_scalar($key[1]) || is_callable([$key[1], '__toString']) ? (string) $key[1] : $key[1]), (null === $key[2] || is_scalar($key[2]) || is_callable([$key[2], '__toString']) ? (string) $key[2] : $key[2])]));
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
     * @return ChildRoundFairway|array|mixed the result, formatted by the current formatter
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
     * @return $this|ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function filterByPrimaryKey($key)
    {
        $this->addUsingAlias(RoundFairwayTableMap::COL_ROUND_ID, $key[0], Criteria::EQUAL);
        $this->addUsingAlias(RoundFairwayTableMap::COL_FAIRWAY_ID, $key[1], Criteria::EQUAL);
        $this->addUsingAlias(RoundFairwayTableMap::COL_PLAYER_ID, $key[2], Criteria::EQUAL);

        return $this;
    }

    /**
     * Filter the query by a list of primary keys
     *
     * @param     array $keys The list of primary key to use for the query
     *
     * @return $this|ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function filterByPrimaryKeys($keys)
    {
        if (empty($keys)) {
            return $this->add(null, '1<>1', Criteria::CUSTOM);
        }
        foreach ($keys as $key) {
            $cton0 = $this->getNewCriterion(RoundFairwayTableMap::COL_ROUND_ID, $key[0], Criteria::EQUAL);
            $cton1 = $this->getNewCriterion(RoundFairwayTableMap::COL_FAIRWAY_ID, $key[1], Criteria::EQUAL);
            $cton0->addAnd($cton1);
            $cton2 = $this->getNewCriterion(RoundFairwayTableMap::COL_PLAYER_ID, $key[2], Criteria::EQUAL);
            $cton0->addAnd($cton2);
            $this->addOr($cton0);
        }

        return $this;
    }

    /**
     * Filter the query on the round_id column
     *
     * Example usage:
     * <code>
     * $query->filterByRoundId(1234); // WHERE round_id = 1234
     * $query->filterByRoundId(array(12, 34)); // WHERE round_id IN (12, 34)
     * $query->filterByRoundId(array('min' => 12)); // WHERE round_id > 12
     * </code>
     *
     * @see       filterByRound()
     *
     * @param     mixed $roundId The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function filterByRoundId($roundId = null, $comparison = null)
    {
        if (is_array($roundId)) {
            $useMinMax = false;
            if (isset($roundId['min'])) {
                $this->addUsingAlias(RoundFairwayTableMap::COL_ROUND_ID, $roundId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($roundId['max'])) {
                $this->addUsingAlias(RoundFairwayTableMap::COL_ROUND_ID, $roundId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(RoundFairwayTableMap::COL_ROUND_ID, $roundId, $comparison);
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
     * @return $this|ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function filterByFairwayId($fairwayId = null, $comparison = null)
    {
        if (is_array($fairwayId)) {
            $useMinMax = false;
            if (isset($fairwayId['min'])) {
                $this->addUsingAlias(RoundFairwayTableMap::COL_FAIRWAY_ID, $fairwayId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($fairwayId['max'])) {
                $this->addUsingAlias(RoundFairwayTableMap::COL_FAIRWAY_ID, $fairwayId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(RoundFairwayTableMap::COL_FAIRWAY_ID, $fairwayId, $comparison);
    }

    /**
     * Filter the query on the player_id column
     *
     * Example usage:
     * <code>
     * $query->filterByPlayerId(1234); // WHERE player_id = 1234
     * $query->filterByPlayerId(array(12, 34)); // WHERE player_id IN (12, 34)
     * $query->filterByPlayerId(array('min' => 12)); // WHERE player_id > 12
     * </code>
     *
     * @see       filterByPlayer()
     *
     * @param     mixed $playerId The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function filterByPlayerId($playerId = null, $comparison = null)
    {
        if (is_array($playerId)) {
            $useMinMax = false;
            if (isset($playerId['min'])) {
                $this->addUsingAlias(RoundFairwayTableMap::COL_PLAYER_ID, $playerId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($playerId['max'])) {
                $this->addUsingAlias(RoundFairwayTableMap::COL_PLAYER_ID, $playerId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(RoundFairwayTableMap::COL_PLAYER_ID, $playerId, $comparison);
    }

    /**
     * Filter the query on the par column
     *
     * Example usage:
     * <code>
     * $query->filterByPar(1234); // WHERE par = 1234
     * $query->filterByPar(array(12, 34)); // WHERE par IN (12, 34)
     * $query->filterByPar(array('min' => 12)); // WHERE par > 12
     * </code>
     *
     * @param     mixed $par The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function filterByPar($par = null, $comparison = null)
    {
        if (is_array($par)) {
            $useMinMax = false;
            if (isset($par['min'])) {
                $this->addUsingAlias(RoundFairwayTableMap::COL_PAR, $par['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($par['max'])) {
                $this->addUsingAlias(RoundFairwayTableMap::COL_PAR, $par['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(RoundFairwayTableMap::COL_PAR, $par, $comparison);
    }

    /**
     * Filter the query on the result column
     *
     * Example usage:
     * <code>
     * $query->filterByResult(1234); // WHERE result = 1234
     * $query->filterByResult(array(12, 34)); // WHERE result IN (12, 34)
     * $query->filterByResult(array('min' => 12)); // WHERE result > 12
     * </code>
     *
     * @param     mixed $result The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function filterByResult($result = null, $comparison = null)
    {
        if (is_array($result)) {
            $useMinMax = false;
            if (isset($result['min'])) {
                $this->addUsingAlias(RoundFairwayTableMap::COL_RESULT, $result['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($result['max'])) {
                $this->addUsingAlias(RoundFairwayTableMap::COL_RESULT, $result['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(RoundFairwayTableMap::COL_RESULT, $result, $comparison);
    }

    /**
     * Filter the query by a related \Moz\Round object
     *
     * @param \Moz\Round|ObjectCollection $round The related object(s) to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function filterByRound($round, $comparison = null)
    {
        if ($round instanceof \Moz\Round) {
            return $this
                ->addUsingAlias(RoundFairwayTableMap::COL_ROUND_ID, $round->getId(), $comparison);
        } elseif ($round instanceof ObjectCollection) {
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }

            return $this
                ->addUsingAlias(RoundFairwayTableMap::COL_ROUND_ID, $round->toKeyValue('PrimaryKey', 'Id'), $comparison);
        } else {
            throw new PropelException('filterByRound() only accepts arguments of type \Moz\Round or Collection');
        }
    }

    /**
     * Adds a JOIN clause to the query using the Round relation
     *
     * @param     string $relationAlias optional alias for the relation
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return $this|ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function joinRound($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        $tableMap = $this->getTableMap();
        $relationMap = $tableMap->getRelation('Round');

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
            $this->addJoinObject($join, 'Round');
        }

        return $this;
    }

    /**
     * Use the Round relation Round object
     *
     * @see useQuery()
     *
     * @param     string $relationAlias optional alias for the relation,
     *                                   to be used as main alias in the secondary query
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return \Moz\RoundQuery A secondary query class using the current class as primary query
     */
    public function useRoundQuery($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        return $this
            ->joinRound($relationAlias, $joinType)
            ->useQuery($relationAlias ? $relationAlias : 'Round', '\Moz\RoundQuery');
    }

    /**
     * Filter the query by a related \Moz\Fairway object
     *
     * @param \Moz\Fairway|ObjectCollection $fairway The related object(s) to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function filterByFairway($fairway, $comparison = null)
    {
        if ($fairway instanceof \Moz\Fairway) {
            return $this
                ->addUsingAlias(RoundFairwayTableMap::COL_FAIRWAY_ID, $fairway->getId(), $comparison);
        } elseif ($fairway instanceof ObjectCollection) {
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }

            return $this
                ->addUsingAlias(RoundFairwayTableMap::COL_FAIRWAY_ID, $fairway->toKeyValue('PrimaryKey', 'Id'), $comparison);
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
     * @return $this|ChildRoundFairwayQuery The current query, for fluid interface
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
     * Filter the query by a related \Moz\Player object
     *
     * @param \Moz\Player|ObjectCollection $player The related object(s) to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function filterByPlayer($player, $comparison = null)
    {
        if ($player instanceof \Moz\Player) {
            return $this
                ->addUsingAlias(RoundFairwayTableMap::COL_PLAYER_ID, $player->getId(), $comparison);
        } elseif ($player instanceof ObjectCollection) {
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }

            return $this
                ->addUsingAlias(RoundFairwayTableMap::COL_PLAYER_ID, $player->toKeyValue('PrimaryKey', 'Id'), $comparison);
        } else {
            throw new PropelException('filterByPlayer() only accepts arguments of type \Moz\Player or Collection');
        }
    }

    /**
     * Adds a JOIN clause to the query using the Player relation
     *
     * @param     string $relationAlias optional alias for the relation
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return $this|ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function joinPlayer($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        $tableMap = $this->getTableMap();
        $relationMap = $tableMap->getRelation('Player');

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
            $this->addJoinObject($join, 'Player');
        }

        return $this;
    }

    /**
     * Use the Player relation Player object
     *
     * @see useQuery()
     *
     * @param     string $relationAlias optional alias for the relation,
     *                                   to be used as main alias in the secondary query
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return \Moz\PlayerQuery A secondary query class using the current class as primary query
     */
    public function usePlayerQuery($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        return $this
            ->joinPlayer($relationAlias, $joinType)
            ->useQuery($relationAlias ? $relationAlias : 'Player', '\Moz\PlayerQuery');
    }

    /**
     * Exclude object from result
     *
     * @param   ChildRoundFairway $roundFairway Object to remove from the list of results
     *
     * @return $this|ChildRoundFairwayQuery The current query, for fluid interface
     */
    public function prune($roundFairway = null)
    {
        if ($roundFairway) {
            $this->addCond('pruneCond0', $this->getAliasedColName(RoundFairwayTableMap::COL_ROUND_ID), $roundFairway->getRoundId(), Criteria::NOT_EQUAL);
            $this->addCond('pruneCond1', $this->getAliasedColName(RoundFairwayTableMap::COL_FAIRWAY_ID), $roundFairway->getFairwayId(), Criteria::NOT_EQUAL);
            $this->addCond('pruneCond2', $this->getAliasedColName(RoundFairwayTableMap::COL_PLAYER_ID), $roundFairway->getPlayerId(), Criteria::NOT_EQUAL);
            $this->combine(array('pruneCond0', 'pruneCond1', 'pruneCond2'), Criteria::LOGICAL_OR);
        }

        return $this;
    }

    /**
     * Deletes all rows from the round_fairway table.
     *
     * @param ConnectionInterface $con the connection to use
     * @return int The number of affected rows (if supported by underlying database driver).
     */
    public function doDeleteAll(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(RoundFairwayTableMap::DATABASE_NAME);
        }

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            $affectedRows += parent::doDeleteAll($con);
            // Because this db requires some delete cascade/set null emulation, we have to
            // clear the cached instance *after* the emulation has happened (since
            // instances get re-added by the select statement contained therein).
            RoundFairwayTableMap::clearInstancePool();
            RoundFairwayTableMap::clearRelatedInstancePool();

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
            $con = Propel::getServiceContainer()->getWriteConnection(RoundFairwayTableMap::DATABASE_NAME);
        }

        $criteria = $this;

        // Set the correct dbName
        $criteria->setDbName(RoundFairwayTableMap::DATABASE_NAME);

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con, $criteria) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            
            RoundFairwayTableMap::removeInstanceFromPool($criteria);
        
            $affectedRows += ModelCriteria::delete($con);
            RoundFairwayTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

} // RoundFairwayQuery
