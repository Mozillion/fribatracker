<?php

namespace Moz\Base;

use \Exception;
use \PDO;
use Moz\Fairway as ChildFairway;
use Moz\FairwayQuery as ChildFairwayQuery;
use Moz\Map\FairwayTableMap;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\ModelCriteria;
use Propel\Runtime\ActiveQuery\ModelJoin;
use Propel\Runtime\Collection\ObjectCollection;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Exception\PropelException;

/**
 * Base class that represents a query for the 'fairway' table.
 *
 * 
 *
 * @method     ChildFairwayQuery orderById($order = Criteria::ASC) Order by the id column
 * @method     ChildFairwayQuery orderByCourseId($order = Criteria::ASC) Order by the course_id column
 * @method     ChildFairwayQuery orderByOrdinal($order = Criteria::ASC) Order by the ordinal column
 * @method     ChildFairwayQuery orderByName($order = Criteria::ASC) Order by the name column
 * @method     ChildFairwayQuery orderByLength($order = Criteria::ASC) Order by the length column
 * @method     ChildFairwayQuery orderByRelief($order = Criteria::ASC) Order by the relief column
 * @method     ChildFairwayQuery orderByPar($order = Criteria::ASC) Order by the par column
 *
 * @method     ChildFairwayQuery groupById() Group by the id column
 * @method     ChildFairwayQuery groupByCourseId() Group by the course_id column
 * @method     ChildFairwayQuery groupByOrdinal() Group by the ordinal column
 * @method     ChildFairwayQuery groupByName() Group by the name column
 * @method     ChildFairwayQuery groupByLength() Group by the length column
 * @method     ChildFairwayQuery groupByRelief() Group by the relief column
 * @method     ChildFairwayQuery groupByPar() Group by the par column
 *
 * @method     ChildFairwayQuery leftJoin($relation) Adds a LEFT JOIN clause to the query
 * @method     ChildFairwayQuery rightJoin($relation) Adds a RIGHT JOIN clause to the query
 * @method     ChildFairwayQuery innerJoin($relation) Adds a INNER JOIN clause to the query
 *
 * @method     ChildFairwayQuery leftJoinWith($relation) Adds a LEFT JOIN clause and with to the query
 * @method     ChildFairwayQuery rightJoinWith($relation) Adds a RIGHT JOIN clause and with to the query
 * @method     ChildFairwayQuery innerJoinWith($relation) Adds a INNER JOIN clause and with to the query
 *
 * @method     ChildFairwayQuery leftJoinCourse($relationAlias = null) Adds a LEFT JOIN clause to the query using the Course relation
 * @method     ChildFairwayQuery rightJoinCourse($relationAlias = null) Adds a RIGHT JOIN clause to the query using the Course relation
 * @method     ChildFairwayQuery innerJoinCourse($relationAlias = null) Adds a INNER JOIN clause to the query using the Course relation
 *
 * @method     ChildFairwayQuery joinWithCourse($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the Course relation
 *
 * @method     ChildFairwayQuery leftJoinWithCourse() Adds a LEFT JOIN clause and with to the query using the Course relation
 * @method     ChildFairwayQuery rightJoinWithCourse() Adds a RIGHT JOIN clause and with to the query using the Course relation
 * @method     ChildFairwayQuery innerJoinWithCourse() Adds a INNER JOIN clause and with to the query using the Course relation
 *
 * @method     ChildFairwayQuery leftJoinLayoutFairway($relationAlias = null) Adds a LEFT JOIN clause to the query using the LayoutFairway relation
 * @method     ChildFairwayQuery rightJoinLayoutFairway($relationAlias = null) Adds a RIGHT JOIN clause to the query using the LayoutFairway relation
 * @method     ChildFairwayQuery innerJoinLayoutFairway($relationAlias = null) Adds a INNER JOIN clause to the query using the LayoutFairway relation
 *
 * @method     ChildFairwayQuery joinWithLayoutFairway($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the LayoutFairway relation
 *
 * @method     ChildFairwayQuery leftJoinWithLayoutFairway() Adds a LEFT JOIN clause and with to the query using the LayoutFairway relation
 * @method     ChildFairwayQuery rightJoinWithLayoutFairway() Adds a RIGHT JOIN clause and with to the query using the LayoutFairway relation
 * @method     ChildFairwayQuery innerJoinWithLayoutFairway() Adds a INNER JOIN clause and with to the query using the LayoutFairway relation
 *
 * @method     ChildFairwayQuery leftJoinRoundFairway($relationAlias = null) Adds a LEFT JOIN clause to the query using the RoundFairway relation
 * @method     ChildFairwayQuery rightJoinRoundFairway($relationAlias = null) Adds a RIGHT JOIN clause to the query using the RoundFairway relation
 * @method     ChildFairwayQuery innerJoinRoundFairway($relationAlias = null) Adds a INNER JOIN clause to the query using the RoundFairway relation
 *
 * @method     ChildFairwayQuery joinWithRoundFairway($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the RoundFairway relation
 *
 * @method     ChildFairwayQuery leftJoinWithRoundFairway() Adds a LEFT JOIN clause and with to the query using the RoundFairway relation
 * @method     ChildFairwayQuery rightJoinWithRoundFairway() Adds a RIGHT JOIN clause and with to the query using the RoundFairway relation
 * @method     ChildFairwayQuery innerJoinWithRoundFairway() Adds a INNER JOIN clause and with to the query using the RoundFairway relation
 *
 * @method     \Moz\CourseQuery|\Moz\LayoutFairwayQuery|\Moz\RoundFairwayQuery endUse() Finalizes a secondary criteria and merges it with its primary Criteria
 *
 * @method     ChildFairway findOne(ConnectionInterface $con = null) Return the first ChildFairway matching the query
 * @method     ChildFairway findOneOrCreate(ConnectionInterface $con = null) Return the first ChildFairway matching the query, or a new ChildFairway object populated from the query conditions when no match is found
 *
 * @method     ChildFairway findOneById(int $id) Return the first ChildFairway filtered by the id column
 * @method     ChildFairway findOneByCourseId(int $course_id) Return the first ChildFairway filtered by the course_id column
 * @method     ChildFairway findOneByOrdinal(int $ordinal) Return the first ChildFairway filtered by the ordinal column
 * @method     ChildFairway findOneByName(string $name) Return the first ChildFairway filtered by the name column
 * @method     ChildFairway findOneByLength(int $length) Return the first ChildFairway filtered by the length column
 * @method     ChildFairway findOneByRelief(int $relief) Return the first ChildFairway filtered by the relief column
 * @method     ChildFairway findOneByPar(int $par) Return the first ChildFairway filtered by the par column *

 * @method     ChildFairway requirePk($key, ConnectionInterface $con = null) Return the ChildFairway by primary key and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildFairway requireOne(ConnectionInterface $con = null) Return the first ChildFairway matching the query and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildFairway requireOneById(int $id) Return the first ChildFairway filtered by the id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildFairway requireOneByCourseId(int $course_id) Return the first ChildFairway filtered by the course_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildFairway requireOneByOrdinal(int $ordinal) Return the first ChildFairway filtered by the ordinal column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildFairway requireOneByName(string $name) Return the first ChildFairway filtered by the name column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildFairway requireOneByLength(int $length) Return the first ChildFairway filtered by the length column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildFairway requireOneByRelief(int $relief) Return the first ChildFairway filtered by the relief column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildFairway requireOneByPar(int $par) Return the first ChildFairway filtered by the par column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildFairway[]|ObjectCollection find(ConnectionInterface $con = null) Return ChildFairway objects based on current ModelCriteria
 * @method     ChildFairway[]|ObjectCollection findById(int $id) Return ChildFairway objects filtered by the id column
 * @method     ChildFairway[]|ObjectCollection findByCourseId(int $course_id) Return ChildFairway objects filtered by the course_id column
 * @method     ChildFairway[]|ObjectCollection findByOrdinal(int $ordinal) Return ChildFairway objects filtered by the ordinal column
 * @method     ChildFairway[]|ObjectCollection findByName(string $name) Return ChildFairway objects filtered by the name column
 * @method     ChildFairway[]|ObjectCollection findByLength(int $length) Return ChildFairway objects filtered by the length column
 * @method     ChildFairway[]|ObjectCollection findByRelief(int $relief) Return ChildFairway objects filtered by the relief column
 * @method     ChildFairway[]|ObjectCollection findByPar(int $par) Return ChildFairway objects filtered by the par column
 * @method     ChildFairway[]|\Propel\Runtime\Util\PropelModelPager paginate($page = 1, $maxPerPage = 10, ConnectionInterface $con = null) Issue a SELECT query based on the current ModelCriteria and uses a page and a maximum number of results per page to compute an offset and a limit
 *
 */
abstract class FairwayQuery extends ModelCriteria
{
    protected $entityNotFoundExceptionClass = '\\Propel\\Runtime\\Exception\\EntityNotFoundException';

    /**
     * Initializes internal state of \Moz\Base\FairwayQuery object.
     *
     * @param     string $dbName The database name
     * @param     string $modelName The phpName of a model, e.g. 'Book'
     * @param     string $modelAlias The alias for the model in this query, e.g. 'b'
     */
    public function __construct($dbName = 'default', $modelName = '\\Moz\\Fairway', $modelAlias = null)
    {
        parent::__construct($dbName, $modelName, $modelAlias);
    }

    /**
     * Returns a new ChildFairwayQuery object.
     *
     * @param     string $modelAlias The alias of a model in the query
     * @param     Criteria $criteria Optional Criteria to build the query from
     *
     * @return ChildFairwayQuery
     */
    public static function create($modelAlias = null, Criteria $criteria = null)
    {
        if ($criteria instanceof ChildFairwayQuery) {
            return $criteria;
        }
        $query = new ChildFairwayQuery();
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
     * @return ChildFairway|array|mixed the result, formatted by the current formatter
     */
    public function findPk($key, ConnectionInterface $con = null)
    {
        if ($key === null) {
            return null;
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getReadConnection(FairwayTableMap::DATABASE_NAME);
        }

        $this->basePreSelect($con);

        if (
            $this->formatter || $this->modelAlias || $this->with || $this->select
            || $this->selectColumns || $this->asColumns || $this->selectModifiers
            || $this->map || $this->having || $this->joins
        ) {
            return $this->findPkComplex($key, $con);
        }

        if ((null !== ($obj = FairwayTableMap::getInstanceFromPool(null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key)))) {
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
     * @return ChildFairway A model object, or null if the key is not found
     */
    protected function findPkSimple($key, ConnectionInterface $con)
    {
        $sql = 'SELECT id, course_id, ordinal, name, length, relief, par FROM fairway WHERE id = :p0';
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
            /** @var ChildFairway $obj */
            $obj = new ChildFairway();
            $obj->hydrate($row);
            FairwayTableMap::addInstanceToPool($obj, null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key);
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
     * @return ChildFairway|array|mixed the result, formatted by the current formatter
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
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function filterByPrimaryKey($key)
    {

        return $this->addUsingAlias(FairwayTableMap::COL_ID, $key, Criteria::EQUAL);
    }

    /**
     * Filter the query by a list of primary keys
     *
     * @param     array $keys The list of primary key to use for the query
     *
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function filterByPrimaryKeys($keys)
    {

        return $this->addUsingAlias(FairwayTableMap::COL_ID, $keys, Criteria::IN);
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
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function filterById($id = null, $comparison = null)
    {
        if (is_array($id)) {
            $useMinMax = false;
            if (isset($id['min'])) {
                $this->addUsingAlias(FairwayTableMap::COL_ID, $id['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($id['max'])) {
                $this->addUsingAlias(FairwayTableMap::COL_ID, $id['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(FairwayTableMap::COL_ID, $id, $comparison);
    }

    /**
     * Filter the query on the course_id column
     *
     * Example usage:
     * <code>
     * $query->filterByCourseId(1234); // WHERE course_id = 1234
     * $query->filterByCourseId(array(12, 34)); // WHERE course_id IN (12, 34)
     * $query->filterByCourseId(array('min' => 12)); // WHERE course_id > 12
     * </code>
     *
     * @see       filterByCourse()
     *
     * @param     mixed $courseId The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function filterByCourseId($courseId = null, $comparison = null)
    {
        if (is_array($courseId)) {
            $useMinMax = false;
            if (isset($courseId['min'])) {
                $this->addUsingAlias(FairwayTableMap::COL_COURSE_ID, $courseId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($courseId['max'])) {
                $this->addUsingAlias(FairwayTableMap::COL_COURSE_ID, $courseId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(FairwayTableMap::COL_COURSE_ID, $courseId, $comparison);
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
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function filterByOrdinal($ordinal = null, $comparison = null)
    {
        if (is_array($ordinal)) {
            $useMinMax = false;
            if (isset($ordinal['min'])) {
                $this->addUsingAlias(FairwayTableMap::COL_ORDINAL, $ordinal['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($ordinal['max'])) {
                $this->addUsingAlias(FairwayTableMap::COL_ORDINAL, $ordinal['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(FairwayTableMap::COL_ORDINAL, $ordinal, $comparison);
    }

    /**
     * Filter the query on the name column
     *
     * Example usage:
     * <code>
     * $query->filterByName('fooValue');   // WHERE name = 'fooValue'
     * $query->filterByName('%fooValue%'); // WHERE name LIKE '%fooValue%'
     * </code>
     *
     * @param     string $name The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE)
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function filterByName($name = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($name)) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(FairwayTableMap::COL_NAME, $name, $comparison);
    }

    /**
     * Filter the query on the length column
     *
     * Example usage:
     * <code>
     * $query->filterByLength(1234); // WHERE length = 1234
     * $query->filterByLength(array(12, 34)); // WHERE length IN (12, 34)
     * $query->filterByLength(array('min' => 12)); // WHERE length > 12
     * </code>
     *
     * @param     mixed $length The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function filterByLength($length = null, $comparison = null)
    {
        if (is_array($length)) {
            $useMinMax = false;
            if (isset($length['min'])) {
                $this->addUsingAlias(FairwayTableMap::COL_LENGTH, $length['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($length['max'])) {
                $this->addUsingAlias(FairwayTableMap::COL_LENGTH, $length['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(FairwayTableMap::COL_LENGTH, $length, $comparison);
    }

    /**
     * Filter the query on the relief column
     *
     * Example usage:
     * <code>
     * $query->filterByRelief(1234); // WHERE relief = 1234
     * $query->filterByRelief(array(12, 34)); // WHERE relief IN (12, 34)
     * $query->filterByRelief(array('min' => 12)); // WHERE relief > 12
     * </code>
     *
     * @param     mixed $relief The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function filterByRelief($relief = null, $comparison = null)
    {
        if (is_array($relief)) {
            $useMinMax = false;
            if (isset($relief['min'])) {
                $this->addUsingAlias(FairwayTableMap::COL_RELIEF, $relief['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($relief['max'])) {
                $this->addUsingAlias(FairwayTableMap::COL_RELIEF, $relief['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(FairwayTableMap::COL_RELIEF, $relief, $comparison);
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
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function filterByPar($par = null, $comparison = null)
    {
        if (is_array($par)) {
            $useMinMax = false;
            if (isset($par['min'])) {
                $this->addUsingAlias(FairwayTableMap::COL_PAR, $par['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($par['max'])) {
                $this->addUsingAlias(FairwayTableMap::COL_PAR, $par['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(FairwayTableMap::COL_PAR, $par, $comparison);
    }

    /**
     * Filter the query by a related \Moz\Course object
     *
     * @param \Moz\Course|ObjectCollection $course The related object(s) to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildFairwayQuery The current query, for fluid interface
     */
    public function filterByCourse($course, $comparison = null)
    {
        if ($course instanceof \Moz\Course) {
            return $this
                ->addUsingAlias(FairwayTableMap::COL_COURSE_ID, $course->getId(), $comparison);
        } elseif ($course instanceof ObjectCollection) {
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }

            return $this
                ->addUsingAlias(FairwayTableMap::COL_COURSE_ID, $course->toKeyValue('PrimaryKey', 'Id'), $comparison);
        } else {
            throw new PropelException('filterByCourse() only accepts arguments of type \Moz\Course or Collection');
        }
    }

    /**
     * Adds a JOIN clause to the query using the Course relation
     *
     * @param     string $relationAlias optional alias for the relation
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function joinCourse($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        $tableMap = $this->getTableMap();
        $relationMap = $tableMap->getRelation('Course');

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
            $this->addJoinObject($join, 'Course');
        }

        return $this;
    }

    /**
     * Use the Course relation Course object
     *
     * @see useQuery()
     *
     * @param     string $relationAlias optional alias for the relation,
     *                                   to be used as main alias in the secondary query
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return \Moz\CourseQuery A secondary query class using the current class as primary query
     */
    public function useCourseQuery($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        return $this
            ->joinCourse($relationAlias, $joinType)
            ->useQuery($relationAlias ? $relationAlias : 'Course', '\Moz\CourseQuery');
    }

    /**
     * Filter the query by a related \Moz\LayoutFairway object
     *
     * @param \Moz\LayoutFairway|ObjectCollection $layoutFairway the related object to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return ChildFairwayQuery The current query, for fluid interface
     */
    public function filterByLayoutFairway($layoutFairway, $comparison = null)
    {
        if ($layoutFairway instanceof \Moz\LayoutFairway) {
            return $this
                ->addUsingAlias(FairwayTableMap::COL_ID, $layoutFairway->getFairwayId(), $comparison);
        } elseif ($layoutFairway instanceof ObjectCollection) {
            return $this
                ->useLayoutFairwayQuery()
                ->filterByPrimaryKeys($layoutFairway->getPrimaryKeys())
                ->endUse();
        } else {
            throw new PropelException('filterByLayoutFairway() only accepts arguments of type \Moz\LayoutFairway or Collection');
        }
    }

    /**
     * Adds a JOIN clause to the query using the LayoutFairway relation
     *
     * @param     string $relationAlias optional alias for the relation
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function joinLayoutFairway($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        $tableMap = $this->getTableMap();
        $relationMap = $tableMap->getRelation('LayoutFairway');

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
            $this->addJoinObject($join, 'LayoutFairway');
        }

        return $this;
    }

    /**
     * Use the LayoutFairway relation LayoutFairway object
     *
     * @see useQuery()
     *
     * @param     string $relationAlias optional alias for the relation,
     *                                   to be used as main alias in the secondary query
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return \Moz\LayoutFairwayQuery A secondary query class using the current class as primary query
     */
    public function useLayoutFairwayQuery($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        return $this
            ->joinLayoutFairway($relationAlias, $joinType)
            ->useQuery($relationAlias ? $relationAlias : 'LayoutFairway', '\Moz\LayoutFairwayQuery');
    }

    /**
     * Filter the query by a related \Moz\RoundFairway object
     *
     * @param \Moz\RoundFairway|ObjectCollection $roundFairway the related object to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return ChildFairwayQuery The current query, for fluid interface
     */
    public function filterByRoundFairway($roundFairway, $comparison = null)
    {
        if ($roundFairway instanceof \Moz\RoundFairway) {
            return $this
                ->addUsingAlias(FairwayTableMap::COL_ID, $roundFairway->getFairwayId(), $comparison);
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
     * @return $this|ChildFairwayQuery The current query, for fluid interface
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
     * @param   ChildFairway $fairway Object to remove from the list of results
     *
     * @return $this|ChildFairwayQuery The current query, for fluid interface
     */
    public function prune($fairway = null)
    {
        if ($fairway) {
            $this->addUsingAlias(FairwayTableMap::COL_ID, $fairway->getId(), Criteria::NOT_EQUAL);
        }

        return $this;
    }

    /**
     * Deletes all rows from the fairway table.
     *
     * @param ConnectionInterface $con the connection to use
     * @return int The number of affected rows (if supported by underlying database driver).
     */
    public function doDeleteAll(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(FairwayTableMap::DATABASE_NAME);
        }

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            $affectedRows += parent::doDeleteAll($con);
            // Because this db requires some delete cascade/set null emulation, we have to
            // clear the cached instance *after* the emulation has happened (since
            // instances get re-added by the select statement contained therein).
            FairwayTableMap::clearInstancePool();
            FairwayTableMap::clearRelatedInstancePool();

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
            $con = Propel::getServiceContainer()->getWriteConnection(FairwayTableMap::DATABASE_NAME);
        }

        $criteria = $this;

        // Set the correct dbName
        $criteria->setDbName(FairwayTableMap::DATABASE_NAME);

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con, $criteria) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            
            FairwayTableMap::removeInstanceFromPool($criteria);
        
            $affectedRows += ModelCriteria::delete($con);
            FairwayTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

} // FairwayQuery
