<?php

namespace Moz\Base;

use \DateTime;
use \Exception;
use \PDO;
use Moz\Course as ChildCourse;
use Moz\CourseQuery as ChildCourseQuery;
use Moz\Layout as ChildLayout;
use Moz\LayoutQuery as ChildLayoutQuery;
use Moz\Player as ChildPlayer;
use Moz\PlayerQuery as ChildPlayerQuery;
use Moz\Round as ChildRound;
use Moz\RoundQuery as ChildRoundQuery;
use Moz\User as ChildUser;
use Moz\UserQuery as ChildUserQuery;
use Moz\Map\CourseTableMap;
use Moz\Map\LayoutTableMap;
use Moz\Map\PlayerTableMap;
use Moz\Map\RoundTableMap;
use Moz\Map\UserTableMap;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\ModelCriteria;
use Propel\Runtime\ActiveRecord\ActiveRecordInterface;
use Propel\Runtime\Collection\Collection;
use Propel\Runtime\Collection\ObjectCollection;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Exception\BadMethodCallException;
use Propel\Runtime\Exception\LogicException;
use Propel\Runtime\Exception\PropelException;
use Propel\Runtime\Map\TableMap;
use Propel\Runtime\Parser\AbstractParser;
use Propel\Runtime\Util\PropelDateTime;

/**
 * Base class that represents a row from the 'user' table.
 *
 * 
 *
 * @package    propel.generator.Moz.Base
 */
abstract class User implements ActiveRecordInterface 
{
    /**
     * TableMap class name
     */
    const TABLE_MAP = '\\Moz\\Map\\UserTableMap';


    /**
     * attribute to determine if this object has previously been saved.
     * @var boolean
     */
    protected $new = true;

    /**
     * attribute to determine whether this object has been deleted.
     * @var boolean
     */
    protected $deleted = false;

    /**
     * The columns that have been modified in current object.
     * Tracking modified columns allows us to only update modified columns.
     * @var array
     */
    protected $modifiedColumns = array();

    /**
     * The (virtual) columns that are added at runtime
     * The formatters can add supplementary columns based on a resultset
     * @var array
     */
    protected $virtualColumns = array();

    /**
     * The value for the id field.
     * 
     * @var        int
     */
    protected $id;

    /**
     * The value for the username field.
     * 
     * @var        string
     */
    protected $username;

    /**
     * The value for the password field.
     * 
     * @var        string
     */
    protected $password;

    /**
     * The value for the role field.
     * 
     * Note: this column has a database default value of: (expression) 'REGISTERED'
     * @var        string
     */
    protected $role;

    /**
     * The value for the player_id field.
     * 
     * @var        int
     */
    protected $player_id;

    /**
     * The value for the time_created field.
     * 
     * Note: this column has a database default value of: (expression) CURRENT_TIMESTAMP
     * @var        DateTime
     */
    protected $time_created;

    /**
     * The value for the state field.
     * 
     * Note: this column has a database default value of: (expression) 'ACTIVE'
     * @var        string
     */
    protected $state;

    /**
     * @var        ChildPlayer
     */
    protected $aPlayerRelatedByPlayerId;

    /**
     * @var        ObjectCollection|ChildPlayer[] Collection to store aggregation of ChildPlayer objects.
     */
    protected $collPlayersRelatedByCreatedByUserId;
    protected $collPlayersRelatedByCreatedByUserIdPartial;

    /**
     * @var        ObjectCollection|ChildCourse[] Collection to store aggregation of ChildCourse objects.
     */
    protected $collCourses;
    protected $collCoursesPartial;

    /**
     * @var        ObjectCollection|ChildLayout[] Collection to store aggregation of ChildLayout objects.
     */
    protected $collLayouts;
    protected $collLayoutsPartial;

    /**
     * @var        ObjectCollection|ChildRound[] Collection to store aggregation of ChildRound objects.
     */
    protected $collRounds;
    protected $collRoundsPartial;

    /**
     * Flag to prevent endless save loop, if this object is referenced
     * by another object which falls in this transaction.
     *
     * @var boolean
     */
    protected $alreadyInSave = false;

    /**
     * An array of objects scheduled for deletion.
     * @var ObjectCollection|ChildPlayer[]
     */
    protected $playersRelatedByCreatedByUserIdScheduledForDeletion = null;

    /**
     * An array of objects scheduled for deletion.
     * @var ObjectCollection|ChildCourse[]
     */
    protected $coursesScheduledForDeletion = null;

    /**
     * An array of objects scheduled for deletion.
     * @var ObjectCollection|ChildLayout[]
     */
    protected $layoutsScheduledForDeletion = null;

    /**
     * An array of objects scheduled for deletion.
     * @var ObjectCollection|ChildRound[]
     */
    protected $roundsScheduledForDeletion = null;

    /**
     * Applies default values to this object.
     * This method should be called from the object's constructor (or
     * equivalent initialization method).
     * @see __construct()
     */
    public function applyDefaultValues()
    {
    }

    /**
     * Initializes internal state of Moz\Base\User object.
     * @see applyDefaults()
     */
    public function __construct()
    {
        $this->applyDefaultValues();
    }

    /**
     * Returns whether the object has been modified.
     *
     * @return boolean True if the object has been modified.
     */
    public function isModified()
    {
        return !!$this->modifiedColumns;
    }

    /**
     * Has specified column been modified?
     *
     * @param  string  $col column fully qualified name (TableMap::TYPE_COLNAME), e.g. Book::AUTHOR_ID
     * @return boolean True if $col has been modified.
     */
    public function isColumnModified($col)
    {
        return $this->modifiedColumns && isset($this->modifiedColumns[$col]);
    }

    /**
     * Get the columns that have been modified in this object.
     * @return array A unique list of the modified column names for this object.
     */
    public function getModifiedColumns()
    {
        return $this->modifiedColumns ? array_keys($this->modifiedColumns) : [];
    }

    /**
     * Returns whether the object has ever been saved.  This will
     * be false, if the object was retrieved from storage or was created
     * and then saved.
     *
     * @return boolean true, if the object has never been persisted.
     */
    public function isNew()
    {
        return $this->new;
    }

    /**
     * Setter for the isNew attribute.  This method will be called
     * by Propel-generated children and objects.
     *
     * @param boolean $b the state of the object.
     */
    public function setNew($b)
    {
        $this->new = (boolean) $b;
    }

    /**
     * Whether this object has been deleted.
     * @return boolean The deleted state of this object.
     */
    public function isDeleted()
    {
        return $this->deleted;
    }

    /**
     * Specify whether this object has been deleted.
     * @param  boolean $b The deleted state of this object.
     * @return void
     */
    public function setDeleted($b)
    {
        $this->deleted = (boolean) $b;
    }

    /**
     * Sets the modified state for the object to be false.
     * @param  string $col If supplied, only the specified column is reset.
     * @return void
     */
    public function resetModified($col = null)
    {
        if (null !== $col) {
            if (isset($this->modifiedColumns[$col])) {
                unset($this->modifiedColumns[$col]);
            }
        } else {
            $this->modifiedColumns = array();
        }
    }

    /**
     * Compares this with another <code>User</code> instance.  If
     * <code>obj</code> is an instance of <code>User</code>, delegates to
     * <code>equals(User)</code>.  Otherwise, returns <code>false</code>.
     *
     * @param  mixed   $obj The object to compare to.
     * @return boolean Whether equal to the object specified.
     */
    public function equals($obj)
    {
        if (!$obj instanceof static) {
            return false;
        }

        if ($this === $obj) {
            return true;
        }

        if (null === $this->getPrimaryKey() || null === $obj->getPrimaryKey()) {
            return false;
        }

        return $this->getPrimaryKey() === $obj->getPrimaryKey();
    }

    /**
     * Get the associative array of the virtual columns in this object
     *
     * @return array
     */
    public function getVirtualColumns()
    {
        return $this->virtualColumns;
    }

    /**
     * Checks the existence of a virtual column in this object
     *
     * @param  string  $name The virtual column name
     * @return boolean
     */
    public function hasVirtualColumn($name)
    {
        return array_key_exists($name, $this->virtualColumns);
    }

    /**
     * Get the value of a virtual column in this object
     *
     * @param  string $name The virtual column name
     * @return mixed
     *
     * @throws PropelException
     */
    public function getVirtualColumn($name)
    {
        if (!$this->hasVirtualColumn($name)) {
            throw new PropelException(sprintf('Cannot get value of inexistent virtual column %s.', $name));
        }

        return $this->virtualColumns[$name];
    }

    /**
     * Set the value of a virtual column in this object
     *
     * @param string $name  The virtual column name
     * @param mixed  $value The value to give to the virtual column
     *
     * @return $this|User The current object, for fluid interface
     */
    public function setVirtualColumn($name, $value)
    {
        $this->virtualColumns[$name] = $value;

        return $this;
    }

    /**
     * Logs a message using Propel::log().
     *
     * @param  string  $msg
     * @param  int     $priority One of the Propel::LOG_* logging levels
     * @return boolean
     */
    protected function log($msg, $priority = Propel::LOG_INFO)
    {
        return Propel::log(get_class($this) . ': ' . $msg, $priority);
    }

    /**
     * Export the current object properties to a string, using a given parser format
     * <code>
     * $book = BookQuery::create()->findPk(9012);
     * echo $book->exportTo('JSON');
     *  => {"Id":9012,"Title":"Don Juan","ISBN":"0140422161","Price":12.99,"PublisherId":1234,"AuthorId":5678}');
     * </code>
     *
     * @param  mixed   $parser                 A AbstractParser instance, or a format name ('XML', 'YAML', 'JSON', 'CSV')
     * @param  boolean $includeLazyLoadColumns (optional) Whether to include lazy load(ed) columns. Defaults to TRUE.
     * @return string  The exported data
     */
    public function exportTo($parser, $includeLazyLoadColumns = true)
    {
        if (!$parser instanceof AbstractParser) {
            $parser = AbstractParser::getParser($parser);
        }

        return $parser->fromArray($this->toArray(TableMap::TYPE_PHPNAME, $includeLazyLoadColumns, array(), true));
    }

    /**
     * Clean up internal collections prior to serializing
     * Avoids recursive loops that turn into segmentation faults when serializing
     */
    public function __sleep()
    {
        $this->clearAllReferences();

        $cls = new \ReflectionClass($this);
        $propertyNames = [];
        $serializableProperties = array_diff($cls->getProperties(), $cls->getProperties(\ReflectionProperty::IS_STATIC));
        
        foreach($serializableProperties as $property) {
            $propertyNames[] = $property->getName();
        }
        
        return $propertyNames;
    }

    /**
     * Get the [id] column value.
     * 
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the [username] column value.
     * 
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Get the [password] column value.
     * 
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Get the [role] column value.
     * 
     * @return string
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * Get the [player_id] column value.
     * 
     * @return int
     */
    public function getPlayerId()
    {
        return $this->player_id;
    }

    /**
     * Get the [optionally formatted] temporal [time_created] column value.
     * 
     *
     * @param      string $format The date/time format string (either date()-style or strftime()-style).
     *                            If format is NULL, then the raw DateTime object will be returned.
     *
     * @return string|DateTime Formatted date/time value as string or DateTime object (if format is NULL), NULL if column is NULL, and 0 if column value is 0000-00-00 00:00:00
     *
     * @throws PropelException - if unable to parse/validate the date/time value.
     */
    public function getTimeCreated($format = NULL)
    {
        if ($format === null) {
            return $this->time_created;
        } else {
            return $this->time_created instanceof \DateTimeInterface ? $this->time_created->format($format) : null;
        }
    }

    /**
     * Get the [state] column value.
     * 
     * @return string
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set the value of [id] column.
     * 
     * @param int $v new value
     * @return $this|\Moz\User The current object (for fluent API support)
     */
    public function setId($v)
    {
        if ($v !== null) {
            $v = (int) $v;
        }

        if ($this->id !== $v) {
            $this->id = $v;
            $this->modifiedColumns[UserTableMap::COL_ID] = true;
        }

        return $this;
    } // setId()

    /**
     * Set the value of [username] column.
     * 
     * @param string $v new value
     * @return $this|\Moz\User The current object (for fluent API support)
     */
    public function setUsername($v)
    {
        if ($v !== null) {
            $v = (string) $v;
        }

        if ($this->username !== $v) {
            $this->username = $v;
            $this->modifiedColumns[UserTableMap::COL_USERNAME] = true;
        }

        return $this;
    } // setUsername()

    /**
     * Set the value of [password] column.
     * 
     * @param string $v new value
     * @return $this|\Moz\User The current object (for fluent API support)
     */
    public function setPassword($v)
    {
        if ($v !== null) {
            $v = (string) $v;
        }

        if ($this->password !== $v) {
            $this->password = $v;
            $this->modifiedColumns[UserTableMap::COL_PASSWORD] = true;
        }

        return $this;
    } // setPassword()

    /**
     * Set the value of [role] column.
     * 
     * @param string $v new value
     * @return $this|\Moz\User The current object (for fluent API support)
     */
    public function setRole($v)
    {
        if ($v !== null) {
            $v = (string) $v;
        }

        if ($this->role !== $v) {
            $this->role = $v;
            $this->modifiedColumns[UserTableMap::COL_ROLE] = true;
        }

        return $this;
    } // setRole()

    /**
     * Set the value of [player_id] column.
     * 
     * @param int $v new value
     * @return $this|\Moz\User The current object (for fluent API support)
     */
    public function setPlayerId($v)
    {
        if ($v !== null) {
            $v = (int) $v;
        }

        if ($this->player_id !== $v) {
            $this->player_id = $v;
            $this->modifiedColumns[UserTableMap::COL_PLAYER_ID] = true;
        }

        if ($this->aPlayerRelatedByPlayerId !== null && $this->aPlayerRelatedByPlayerId->getId() !== $v) {
            $this->aPlayerRelatedByPlayerId = null;
        }

        return $this;
    } // setPlayerId()

    /**
     * Sets the value of [time_created] column to a normalized version of the date/time value specified.
     * 
     * @param  mixed $v string, integer (timestamp), or \DateTimeInterface value.
     *               Empty strings are treated as NULL.
     * @return $this|\Moz\User The current object (for fluent API support)
     */
    public function setTimeCreated($v)
    {
        $dt = PropelDateTime::newInstance($v, null, 'DateTime');
        if ($this->time_created !== null || $dt !== null) {
            if ($this->time_created === null || $dt === null || $dt->format("Y-m-d H:i:s.u") !== $this->time_created->format("Y-m-d H:i:s.u")) {
                $this->time_created = $dt === null ? null : clone $dt;
                $this->modifiedColumns[UserTableMap::COL_TIME_CREATED] = true;
            }
        } // if either are not null

        return $this;
    } // setTimeCreated()

    /**
     * Set the value of [state] column.
     * 
     * @param string $v new value
     * @return $this|\Moz\User The current object (for fluent API support)
     */
    public function setState($v)
    {
        if ($v !== null) {
            $v = (string) $v;
        }

        if ($this->state !== $v) {
            $this->state = $v;
            $this->modifiedColumns[UserTableMap::COL_STATE] = true;
        }

        return $this;
    } // setState()

    /**
     * Indicates whether the columns in this object are only set to default values.
     *
     * This method can be used in conjunction with isModified() to indicate whether an object is both
     * modified _and_ has some values set which are non-default.
     *
     * @return boolean Whether the columns in this object are only been set with default values.
     */
    public function hasOnlyDefaultValues()
    {
        // otherwise, everything was equal, so return TRUE
        return true;
    } // hasOnlyDefaultValues()

    /**
     * Hydrates (populates) the object variables with values from the database resultset.
     *
     * An offset (0-based "start column") is specified so that objects can be hydrated
     * with a subset of the columns in the resultset rows.  This is needed, for example,
     * for results of JOIN queries where the resultset row includes columns from two or
     * more tables.
     *
     * @param array   $row       The row returned by DataFetcher->fetch().
     * @param int     $startcol  0-based offset column which indicates which restultset column to start with.
     * @param boolean $rehydrate Whether this object is being re-hydrated from the database.
     * @param string  $indexType The index type of $row. Mostly DataFetcher->getIndexType().
                                  One of the class type constants TableMap::TYPE_PHPNAME, TableMap::TYPE_CAMELNAME
     *                            TableMap::TYPE_COLNAME, TableMap::TYPE_FIELDNAME, TableMap::TYPE_NUM.
     *
     * @return int             next starting column
     * @throws PropelException - Any caught Exception will be rewrapped as a PropelException.
     */
    public function hydrate($row, $startcol = 0, $rehydrate = false, $indexType = TableMap::TYPE_NUM)
    {
        try {

            $col = $row[TableMap::TYPE_NUM == $indexType ? 0 + $startcol : UserTableMap::translateFieldName('Id', TableMap::TYPE_PHPNAME, $indexType)];
            $this->id = (null !== $col) ? (int) $col : null;

            $col = $row[TableMap::TYPE_NUM == $indexType ? 1 + $startcol : UserTableMap::translateFieldName('Username', TableMap::TYPE_PHPNAME, $indexType)];
            $this->username = (null !== $col) ? (string) $col : null;

            $col = $row[TableMap::TYPE_NUM == $indexType ? 2 + $startcol : UserTableMap::translateFieldName('Password', TableMap::TYPE_PHPNAME, $indexType)];
            $this->password = (null !== $col) ? (string) $col : null;

            $col = $row[TableMap::TYPE_NUM == $indexType ? 3 + $startcol : UserTableMap::translateFieldName('Role', TableMap::TYPE_PHPNAME, $indexType)];
            $this->role = (null !== $col) ? (string) $col : null;

            $col = $row[TableMap::TYPE_NUM == $indexType ? 4 + $startcol : UserTableMap::translateFieldName('PlayerId', TableMap::TYPE_PHPNAME, $indexType)];
            $this->player_id = (null !== $col) ? (int) $col : null;

            $col = $row[TableMap::TYPE_NUM == $indexType ? 5 + $startcol : UserTableMap::translateFieldName('TimeCreated', TableMap::TYPE_PHPNAME, $indexType)];
            if ($col === '0000-00-00 00:00:00') {
                $col = null;
            }
            $this->time_created = (null !== $col) ? PropelDateTime::newInstance($col, null, 'DateTime') : null;

            $col = $row[TableMap::TYPE_NUM == $indexType ? 6 + $startcol : UserTableMap::translateFieldName('State', TableMap::TYPE_PHPNAME, $indexType)];
            $this->state = (null !== $col) ? (string) $col : null;
            $this->resetModified();

            $this->setNew(false);

            if ($rehydrate) {
                $this->ensureConsistency();
            }

            return $startcol + 7; // 7 = UserTableMap::NUM_HYDRATE_COLUMNS.

        } catch (Exception $e) {
            throw new PropelException(sprintf('Error populating %s object', '\\Moz\\User'), 0, $e);
        }
    }

    /**
     * Checks and repairs the internal consistency of the object.
     *
     * This method is executed after an already-instantiated object is re-hydrated
     * from the database.  It exists to check any foreign keys to make sure that
     * the objects related to the current object are correct based on foreign key.
     *
     * You can override this method in the stub class, but you should always invoke
     * the base method from the overridden method (i.e. parent::ensureConsistency()),
     * in case your model changes.
     *
     * @throws PropelException
     */
    public function ensureConsistency()
    {
        if ($this->aPlayerRelatedByPlayerId !== null && $this->player_id !== $this->aPlayerRelatedByPlayerId->getId()) {
            $this->aPlayerRelatedByPlayerId = null;
        }
    } // ensureConsistency

    /**
     * Reloads this object from datastore based on primary key and (optionally) resets all associated objects.
     *
     * This will only work if the object has been saved and has a valid primary key set.
     *
     * @param      boolean $deep (optional) Whether to also de-associated any related objects.
     * @param      ConnectionInterface $con (optional) The ConnectionInterface connection to use.
     * @return void
     * @throws PropelException - if this object is deleted, unsaved or doesn't have pk match in db
     */
    public function reload($deep = false, ConnectionInterface $con = null)
    {
        if ($this->isDeleted()) {
            throw new PropelException("Cannot reload a deleted object.");
        }

        if ($this->isNew()) {
            throw new PropelException("Cannot reload an unsaved object.");
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getReadConnection(UserTableMap::DATABASE_NAME);
        }

        // We don't need to alter the object instance pool; we're just modifying this instance
        // already in the pool.

        $dataFetcher = ChildUserQuery::create(null, $this->buildPkeyCriteria())->setFormatter(ModelCriteria::FORMAT_STATEMENT)->find($con);
        $row = $dataFetcher->fetch();
        $dataFetcher->close();
        if (!$row) {
            throw new PropelException('Cannot find matching row in the database to reload object values.');
        }
        $this->hydrate($row, 0, true, $dataFetcher->getIndexType()); // rehydrate

        if ($deep) {  // also de-associate any related objects?

            $this->aPlayerRelatedByPlayerId = null;
            $this->collPlayersRelatedByCreatedByUserId = null;

            $this->collCourses = null;

            $this->collLayouts = null;

            $this->collRounds = null;

        } // if (deep)
    }

    /**
     * Removes this object from datastore and sets delete attribute.
     *
     * @param      ConnectionInterface $con
     * @return void
     * @throws PropelException
     * @see User::setDeleted()
     * @see User::isDeleted()
     */
    public function delete(ConnectionInterface $con = null)
    {
        if ($this->isDeleted()) {
            throw new PropelException("This object has already been deleted.");
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getWriteConnection(UserTableMap::DATABASE_NAME);
        }

        $con->transaction(function () use ($con) {
            $deleteQuery = ChildUserQuery::create()
                ->filterByPrimaryKey($this->getPrimaryKey());
            $ret = $this->preDelete($con);
            if ($ret) {
                $deleteQuery->delete($con);
                $this->postDelete($con);
                $this->setDeleted(true);
            }
        });
    }

    /**
     * Persists this object to the database.
     *
     * If the object is new, it inserts it; otherwise an update is performed.
     * All modified related objects will also be persisted in the doSave()
     * method.  This method wraps all precipitate database operations in a
     * single transaction.
     *
     * @param      ConnectionInterface $con
     * @return int             The number of rows affected by this insert/update and any referring fk objects' save() operations.
     * @throws PropelException
     * @see doSave()
     */
    public function save(ConnectionInterface $con = null)
    {
        if ($this->isDeleted()) {
            throw new PropelException("You cannot save an object that has been deleted.");
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getWriteConnection(UserTableMap::DATABASE_NAME);
        }

        return $con->transaction(function () use ($con) {
            $ret = $this->preSave($con);
            $isInsert = $this->isNew();
            if ($isInsert) {
                $ret = $ret && $this->preInsert($con);
            } else {
                $ret = $ret && $this->preUpdate($con);
            }
            if ($ret) {
                $affectedRows = $this->doSave($con);
                if ($isInsert) {
                    $this->postInsert($con);
                } else {
                    $this->postUpdate($con);
                }
                $this->postSave($con);
                UserTableMap::addInstanceToPool($this);
            } else {
                $affectedRows = 0;
            }

            return $affectedRows;
        });
    }

    /**
     * Performs the work of inserting or updating the row in the database.
     *
     * If the object is new, it inserts it; otherwise an update is performed.
     * All related objects are also updated in this method.
     *
     * @param      ConnectionInterface $con
     * @return int             The number of rows affected by this insert/update and any referring fk objects' save() operations.
     * @throws PropelException
     * @see save()
     */
    protected function doSave(ConnectionInterface $con)
    {
        $affectedRows = 0; // initialize var to track total num of affected rows
        if (!$this->alreadyInSave) {
            $this->alreadyInSave = true;

            // We call the save method on the following object(s) if they
            // were passed to this object by their corresponding set
            // method.  This object relates to these object(s) by a
            // foreign key reference.

            if ($this->aPlayerRelatedByPlayerId !== null) {
                if ($this->aPlayerRelatedByPlayerId->isModified() || $this->aPlayerRelatedByPlayerId->isNew()) {
                    $affectedRows += $this->aPlayerRelatedByPlayerId->save($con);
                }
                $this->setPlayerRelatedByPlayerId($this->aPlayerRelatedByPlayerId);
            }

            if ($this->isNew() || $this->isModified()) {
                // persist changes
                if ($this->isNew()) {
                    $this->doInsert($con);
                    $affectedRows += 1;
                } else {
                    $affectedRows += $this->doUpdate($con);
                }
                $this->resetModified();
            }

            if ($this->playersRelatedByCreatedByUserIdScheduledForDeletion !== null) {
                if (!$this->playersRelatedByCreatedByUserIdScheduledForDeletion->isEmpty()) {
                    foreach ($this->playersRelatedByCreatedByUserIdScheduledForDeletion as $playerRelatedByCreatedByUserId) {
                        // need to save related object because we set the relation to null
                        $playerRelatedByCreatedByUserId->save($con);
                    }
                    $this->playersRelatedByCreatedByUserIdScheduledForDeletion = null;
                }
            }

            if ($this->collPlayersRelatedByCreatedByUserId !== null) {
                foreach ($this->collPlayersRelatedByCreatedByUserId as $referrerFK) {
                    if (!$referrerFK->isDeleted() && ($referrerFK->isNew() || $referrerFK->isModified())) {
                        $affectedRows += $referrerFK->save($con);
                    }
                }
            }

            if ($this->coursesScheduledForDeletion !== null) {
                if (!$this->coursesScheduledForDeletion->isEmpty()) {
                    foreach ($this->coursesScheduledForDeletion as $course) {
                        // need to save related object because we set the relation to null
                        $course->save($con);
                    }
                    $this->coursesScheduledForDeletion = null;
                }
            }

            if ($this->collCourses !== null) {
                foreach ($this->collCourses as $referrerFK) {
                    if (!$referrerFK->isDeleted() && ($referrerFK->isNew() || $referrerFK->isModified())) {
                        $affectedRows += $referrerFK->save($con);
                    }
                }
            }

            if ($this->layoutsScheduledForDeletion !== null) {
                if (!$this->layoutsScheduledForDeletion->isEmpty()) {
                    foreach ($this->layoutsScheduledForDeletion as $layout) {
                        // need to save related object because we set the relation to null
                        $layout->save($con);
                    }
                    $this->layoutsScheduledForDeletion = null;
                }
            }

            if ($this->collLayouts !== null) {
                foreach ($this->collLayouts as $referrerFK) {
                    if (!$referrerFK->isDeleted() && ($referrerFK->isNew() || $referrerFK->isModified())) {
                        $affectedRows += $referrerFK->save($con);
                    }
                }
            }

            if ($this->roundsScheduledForDeletion !== null) {
                if (!$this->roundsScheduledForDeletion->isEmpty()) {
                    \Moz\RoundQuery::create()
                        ->filterByPrimaryKeys($this->roundsScheduledForDeletion->getPrimaryKeys(false))
                        ->delete($con);
                    $this->roundsScheduledForDeletion = null;
                }
            }

            if ($this->collRounds !== null) {
                foreach ($this->collRounds as $referrerFK) {
                    if (!$referrerFK->isDeleted() && ($referrerFK->isNew() || $referrerFK->isModified())) {
                        $affectedRows += $referrerFK->save($con);
                    }
                }
            }

            $this->alreadyInSave = false;

        }

        return $affectedRows;
    } // doSave()

    /**
     * Insert the row in the database.
     *
     * @param      ConnectionInterface $con
     *
     * @throws PropelException
     * @see doSave()
     */
    protected function doInsert(ConnectionInterface $con)
    {
        $modifiedColumns = array();
        $index = 0;

        $this->modifiedColumns[UserTableMap::COL_ID] = true;
        if (null !== $this->id) {
            throw new PropelException('Cannot insert a value for auto-increment primary key (' . UserTableMap::COL_ID . ')');
        }

         // check the columns in natural order for more readable SQL queries
        if ($this->isColumnModified(UserTableMap::COL_ID)) {
            $modifiedColumns[':p' . $index++]  = 'id';
        }
        if ($this->isColumnModified(UserTableMap::COL_USERNAME)) {
            $modifiedColumns[':p' . $index++]  = 'username';
        }
        if ($this->isColumnModified(UserTableMap::COL_PASSWORD)) {
            $modifiedColumns[':p' . $index++]  = 'password';
        }
        if ($this->isColumnModified(UserTableMap::COL_ROLE)) {
            $modifiedColumns[':p' . $index++]  = 'role';
        }
        if ($this->isColumnModified(UserTableMap::COL_PLAYER_ID)) {
            $modifiedColumns[':p' . $index++]  = 'player_id';
        }
        if ($this->isColumnModified(UserTableMap::COL_TIME_CREATED)) {
            $modifiedColumns[':p' . $index++]  = 'time_created';
        }
        if ($this->isColumnModified(UserTableMap::COL_STATE)) {
            $modifiedColumns[':p' . $index++]  = 'state';
        }

        $sql = sprintf(
            'INSERT INTO user (%s) VALUES (%s)',
            implode(', ', $modifiedColumns),
            implode(', ', array_keys($modifiedColumns))
        );

        try {
            $stmt = $con->prepare($sql);
            foreach ($modifiedColumns as $identifier => $columnName) {
                switch ($columnName) {
                    case 'id':                        
                        $stmt->bindValue($identifier, $this->id, PDO::PARAM_INT);
                        break;
                    case 'username':                        
                        $stmt->bindValue($identifier, $this->username, PDO::PARAM_STR);
                        break;
                    case 'password':                        
                        $stmt->bindValue($identifier, $this->password, PDO::PARAM_STR);
                        break;
                    case 'role':                        
                        $stmt->bindValue($identifier, $this->role, PDO::PARAM_STR);
                        break;
                    case 'player_id':                        
                        $stmt->bindValue($identifier, $this->player_id, PDO::PARAM_INT);
                        break;
                    case 'time_created':                        
                        $stmt->bindValue($identifier, $this->time_created ? $this->time_created->format("Y-m-d H:i:s.u") : null, PDO::PARAM_STR);
                        break;
                    case 'state':                        
                        $stmt->bindValue($identifier, $this->state, PDO::PARAM_STR);
                        break;
                }
            }
            $stmt->execute();
        } catch (Exception $e) {
            Propel::log($e->getMessage(), Propel::LOG_ERR);
            throw new PropelException(sprintf('Unable to execute INSERT statement [%s]', $sql), 0, $e);
        }

        try {
            $pk = $con->lastInsertId();
        } catch (Exception $e) {
            throw new PropelException('Unable to get autoincrement id.', 0, $e);
        }
        $this->setId($pk);

        $this->setNew(false);
    }

    /**
     * Update the row in the database.
     *
     * @param      ConnectionInterface $con
     *
     * @return Integer Number of updated rows
     * @see doSave()
     */
    protected function doUpdate(ConnectionInterface $con)
    {
        $selectCriteria = $this->buildPkeyCriteria();
        $valuesCriteria = $this->buildCriteria();

        return $selectCriteria->doUpdate($valuesCriteria, $con);
    }

    /**
     * Retrieves a field from the object by name passed in as a string.
     *
     * @param      string $name name
     * @param      string $type The type of fieldname the $name is of:
     *                     one of the class type constants TableMap::TYPE_PHPNAME, TableMap::TYPE_CAMELNAME
     *                     TableMap::TYPE_COLNAME, TableMap::TYPE_FIELDNAME, TableMap::TYPE_NUM.
     *                     Defaults to TableMap::TYPE_PHPNAME.
     * @return mixed Value of field.
     */
    public function getByName($name, $type = TableMap::TYPE_PHPNAME)
    {
        $pos = UserTableMap::translateFieldName($name, $type, TableMap::TYPE_NUM);
        $field = $this->getByPosition($pos);

        return $field;
    }

    /**
     * Retrieves a field from the object by Position as specified in the xml schema.
     * Zero-based.
     *
     * @param      int $pos position in xml schema
     * @return mixed Value of field at $pos
     */
    public function getByPosition($pos)
    {
        switch ($pos) {
            case 0:
                return $this->getId();
                break;
            case 1:
                return $this->getUsername();
                break;
            case 2:
                return $this->getPassword();
                break;
            case 3:
                return $this->getRole();
                break;
            case 4:
                return $this->getPlayerId();
                break;
            case 5:
                return $this->getTimeCreated();
                break;
            case 6:
                return $this->getState();
                break;
            default:
                return null;
                break;
        } // switch()
    }

    /**
     * Exports the object as an array.
     *
     * You can specify the key type of the array by passing one of the class
     * type constants.
     *
     * @param     string  $keyType (optional) One of the class type constants TableMap::TYPE_PHPNAME, TableMap::TYPE_CAMELNAME,
     *                    TableMap::TYPE_COLNAME, TableMap::TYPE_FIELDNAME, TableMap::TYPE_NUM.
     *                    Defaults to TableMap::TYPE_PHPNAME.
     * @param     boolean $includeLazyLoadColumns (optional) Whether to include lazy loaded columns. Defaults to TRUE.
     * @param     array $alreadyDumpedObjects List of objects to skip to avoid recursion
     * @param     boolean $includeForeignObjects (optional) Whether to include hydrated related objects. Default to FALSE.
     *
     * @return array an associative array containing the field names (as keys) and field values
     */
    public function toArray($keyType = TableMap::TYPE_PHPNAME, $includeLazyLoadColumns = true, $alreadyDumpedObjects = array(), $includeForeignObjects = false)
    {

        if (isset($alreadyDumpedObjects['User'][$this->hashCode()])) {
            return '*RECURSION*';
        }
        $alreadyDumpedObjects['User'][$this->hashCode()] = true;
        $keys = UserTableMap::getFieldNames($keyType);
        $result = array(
            $keys[0] => $this->getId(),
            $keys[1] => $this->getUsername(),
            $keys[2] => $this->getPassword(),
            $keys[3] => $this->getRole(),
            $keys[4] => $this->getPlayerId(),
            $keys[5] => $this->getTimeCreated(),
            $keys[6] => $this->getState(),
        );
        if ($result[$keys[5]] instanceof \DateTime) {
            $result[$keys[5]] = $result[$keys[5]]->format('c');
        }
        
        $virtualColumns = $this->virtualColumns;
        foreach ($virtualColumns as $key => $virtualColumn) {
            $result[$key] = $virtualColumn;
        }
        
        if ($includeForeignObjects) {
            if (null !== $this->aPlayerRelatedByPlayerId) {
                
                switch ($keyType) {
                    case TableMap::TYPE_CAMELNAME:
                        $key = 'player';
                        break;
                    case TableMap::TYPE_FIELDNAME:
                        $key = 'player';
                        break;
                    default:
                        $key = 'Player';
                }
        
                $result[$key] = $this->aPlayerRelatedByPlayerId->toArray($keyType, $includeLazyLoadColumns,  $alreadyDumpedObjects, true);
            }
            if (null !== $this->collPlayersRelatedByCreatedByUserId) {
                
                switch ($keyType) {
                    case TableMap::TYPE_CAMELNAME:
                        $key = 'players';
                        break;
                    case TableMap::TYPE_FIELDNAME:
                        $key = 'players';
                        break;
                    default:
                        $key = 'Players';
                }
        
                $result[$key] = $this->collPlayersRelatedByCreatedByUserId->toArray(null, false, $keyType, $includeLazyLoadColumns, $alreadyDumpedObjects);
            }
            if (null !== $this->collCourses) {
                
                switch ($keyType) {
                    case TableMap::TYPE_CAMELNAME:
                        $key = 'courses';
                        break;
                    case TableMap::TYPE_FIELDNAME:
                        $key = 'courses';
                        break;
                    default:
                        $key = 'Courses';
                }
        
                $result[$key] = $this->collCourses->toArray(null, false, $keyType, $includeLazyLoadColumns, $alreadyDumpedObjects);
            }
            if (null !== $this->collLayouts) {
                
                switch ($keyType) {
                    case TableMap::TYPE_CAMELNAME:
                        $key = 'layouts';
                        break;
                    case TableMap::TYPE_FIELDNAME:
                        $key = 'layouts';
                        break;
                    default:
                        $key = 'Layouts';
                }
        
                $result[$key] = $this->collLayouts->toArray(null, false, $keyType, $includeLazyLoadColumns, $alreadyDumpedObjects);
            }
            if (null !== $this->collRounds) {
                
                switch ($keyType) {
                    case TableMap::TYPE_CAMELNAME:
                        $key = 'rounds';
                        break;
                    case TableMap::TYPE_FIELDNAME:
                        $key = 'rounds';
                        break;
                    default:
                        $key = 'Rounds';
                }
        
                $result[$key] = $this->collRounds->toArray(null, false, $keyType, $includeLazyLoadColumns, $alreadyDumpedObjects);
            }
        }

        return $result;
    }

    /**
     * Sets a field from the object by name passed in as a string.
     *
     * @param  string $name
     * @param  mixed  $value field value
     * @param  string $type The type of fieldname the $name is of:
     *                one of the class type constants TableMap::TYPE_PHPNAME, TableMap::TYPE_CAMELNAME
     *                TableMap::TYPE_COLNAME, TableMap::TYPE_FIELDNAME, TableMap::TYPE_NUM.
     *                Defaults to TableMap::TYPE_PHPNAME.
     * @return $this|\Moz\User
     */
    public function setByName($name, $value, $type = TableMap::TYPE_PHPNAME)
    {
        $pos = UserTableMap::translateFieldName($name, $type, TableMap::TYPE_NUM);

        return $this->setByPosition($pos, $value);
    }

    /**
     * Sets a field from the object by Position as specified in the xml schema.
     * Zero-based.
     *
     * @param  int $pos position in xml schema
     * @param  mixed $value field value
     * @return $this|\Moz\User
     */
    public function setByPosition($pos, $value)
    {
        switch ($pos) {
            case 0:
                $this->setId($value);
                break;
            case 1:
                $this->setUsername($value);
                break;
            case 2:
                $this->setPassword($value);
                break;
            case 3:
                $this->setRole($value);
                break;
            case 4:
                $this->setPlayerId($value);
                break;
            case 5:
                $this->setTimeCreated($value);
                break;
            case 6:
                $this->setState($value);
                break;
        } // switch()

        return $this;
    }

    /**
     * Populates the object using an array.
     *
     * This is particularly useful when populating an object from one of the
     * request arrays (e.g. $_POST).  This method goes through the column
     * names, checking to see whether a matching key exists in populated
     * array. If so the setByName() method is called for that column.
     *
     * You can specify the key type of the array by additionally passing one
     * of the class type constants TableMap::TYPE_PHPNAME, TableMap::TYPE_CAMELNAME,
     * TableMap::TYPE_COLNAME, TableMap::TYPE_FIELDNAME, TableMap::TYPE_NUM.
     * The default key type is the column's TableMap::TYPE_PHPNAME.
     *
     * @param      array  $arr     An array to populate the object from.
     * @param      string $keyType The type of keys the array uses.
     * @return void
     */
    public function fromArray($arr, $keyType = TableMap::TYPE_PHPNAME)
    {
        $keys = UserTableMap::getFieldNames($keyType);

        if (array_key_exists($keys[0], $arr)) {
            $this->setId($arr[$keys[0]]);
        }
        if (array_key_exists($keys[1], $arr)) {
            $this->setUsername($arr[$keys[1]]);
        }
        if (array_key_exists($keys[2], $arr)) {
            $this->setPassword($arr[$keys[2]]);
        }
        if (array_key_exists($keys[3], $arr)) {
            $this->setRole($arr[$keys[3]]);
        }
        if (array_key_exists($keys[4], $arr)) {
            $this->setPlayerId($arr[$keys[4]]);
        }
        if (array_key_exists($keys[5], $arr)) {
            $this->setTimeCreated($arr[$keys[5]]);
        }
        if (array_key_exists($keys[6], $arr)) {
            $this->setState($arr[$keys[6]]);
        }
    }

     /**
     * Populate the current object from a string, using a given parser format
     * <code>
     * $book = new Book();
     * $book->importFrom('JSON', '{"Id":9012,"Title":"Don Juan","ISBN":"0140422161","Price":12.99,"PublisherId":1234,"AuthorId":5678}');
     * </code>
     *
     * You can specify the key type of the array by additionally passing one
     * of the class type constants TableMap::TYPE_PHPNAME, TableMap::TYPE_CAMELNAME,
     * TableMap::TYPE_COLNAME, TableMap::TYPE_FIELDNAME, TableMap::TYPE_NUM.
     * The default key type is the column's TableMap::TYPE_PHPNAME.
     *
     * @param mixed $parser A AbstractParser instance,
     *                       or a format name ('XML', 'YAML', 'JSON', 'CSV')
     * @param string $data The source data to import from
     * @param string $keyType The type of keys the array uses.
     *
     * @return $this|\Moz\User The current object, for fluid interface
     */
    public function importFrom($parser, $data, $keyType = TableMap::TYPE_PHPNAME)
    {
        if (!$parser instanceof AbstractParser) {
            $parser = AbstractParser::getParser($parser);
        }

        $this->fromArray($parser->toArray($data), $keyType);

        return $this;
    }

    /**
     * Build a Criteria object containing the values of all modified columns in this object.
     *
     * @return Criteria The Criteria object containing all modified values.
     */
    public function buildCriteria()
    {
        $criteria = new Criteria(UserTableMap::DATABASE_NAME);

        if ($this->isColumnModified(UserTableMap::COL_ID)) {
            $criteria->add(UserTableMap::COL_ID, $this->id);
        }
        if ($this->isColumnModified(UserTableMap::COL_USERNAME)) {
            $criteria->add(UserTableMap::COL_USERNAME, $this->username);
        }
        if ($this->isColumnModified(UserTableMap::COL_PASSWORD)) {
            $criteria->add(UserTableMap::COL_PASSWORD, $this->password);
        }
        if ($this->isColumnModified(UserTableMap::COL_ROLE)) {
            $criteria->add(UserTableMap::COL_ROLE, $this->role);
        }
        if ($this->isColumnModified(UserTableMap::COL_PLAYER_ID)) {
            $criteria->add(UserTableMap::COL_PLAYER_ID, $this->player_id);
        }
        if ($this->isColumnModified(UserTableMap::COL_TIME_CREATED)) {
            $criteria->add(UserTableMap::COL_TIME_CREATED, $this->time_created);
        }
        if ($this->isColumnModified(UserTableMap::COL_STATE)) {
            $criteria->add(UserTableMap::COL_STATE, $this->state);
        }

        return $criteria;
    }

    /**
     * Builds a Criteria object containing the primary key for this object.
     *
     * Unlike buildCriteria() this method includes the primary key values regardless
     * of whether or not they have been modified.
     *
     * @throws LogicException if no primary key is defined
     *
     * @return Criteria The Criteria object containing value(s) for primary key(s).
     */
    public function buildPkeyCriteria()
    {
        $criteria = ChildUserQuery::create();
        $criteria->add(UserTableMap::COL_ID, $this->id);

        return $criteria;
    }

    /**
     * If the primary key is not null, return the hashcode of the
     * primary key. Otherwise, return the hash code of the object.
     *
     * @return int Hashcode
     */
    public function hashCode()
    {
        $validPk = null !== $this->getId();

        $validPrimaryKeyFKs = 0;
        $primaryKeyFKs = [];

        if ($validPk) {
            return crc32(json_encode($this->getPrimaryKey(), JSON_UNESCAPED_UNICODE));
        } elseif ($validPrimaryKeyFKs) {
            return crc32(json_encode($primaryKeyFKs, JSON_UNESCAPED_UNICODE));
        }

        return spl_object_hash($this);
    }
        
    /**
     * Returns the primary key for this object (row).
     * @return int
     */
    public function getPrimaryKey()
    {
        return $this->getId();
    }

    /**
     * Generic method to set the primary key (id column).
     *
     * @param       int $key Primary key.
     * @return void
     */
    public function setPrimaryKey($key)
    {
        $this->setId($key);
    }

    /**
     * Returns true if the primary key for this object is null.
     * @return boolean
     */
    public function isPrimaryKeyNull()
    {
        return null === $this->getId();
    }

    /**
     * Sets contents of passed object to values from current object.
     *
     * If desired, this method can also make copies of all associated (fkey referrers)
     * objects.
     *
     * @param      object $copyObj An object of \Moz\User (or compatible) type.
     * @param      boolean $deepCopy Whether to also copy all rows that refer (by fkey) to the current row.
     * @param      boolean $makeNew Whether to reset autoincrement PKs and make the object new.
     * @throws PropelException
     */
    public function copyInto($copyObj, $deepCopy = false, $makeNew = true)
    {
        $copyObj->setUsername($this->getUsername());
        $copyObj->setPassword($this->getPassword());
        $copyObj->setRole($this->getRole());
        $copyObj->setPlayerId($this->getPlayerId());
        $copyObj->setTimeCreated($this->getTimeCreated());
        $copyObj->setState($this->getState());

        if ($deepCopy) {
            // important: temporarily setNew(false) because this affects the behavior of
            // the getter/setter methods for fkey referrer objects.
            $copyObj->setNew(false);

            foreach ($this->getPlayersRelatedByCreatedByUserId() as $relObj) {
                if ($relObj !== $this) {  // ensure that we don't try to copy a reference to ourselves
                    $copyObj->addPlayerRelatedByCreatedByUserId($relObj->copy($deepCopy));
                }
            }

            foreach ($this->getCourses() as $relObj) {
                if ($relObj !== $this) {  // ensure that we don't try to copy a reference to ourselves
                    $copyObj->addCourse($relObj->copy($deepCopy));
                }
            }

            foreach ($this->getLayouts() as $relObj) {
                if ($relObj !== $this) {  // ensure that we don't try to copy a reference to ourselves
                    $copyObj->addLayout($relObj->copy($deepCopy));
                }
            }

            foreach ($this->getRounds() as $relObj) {
                if ($relObj !== $this) {  // ensure that we don't try to copy a reference to ourselves
                    $copyObj->addRound($relObj->copy($deepCopy));
                }
            }

        } // if ($deepCopy)

        if ($makeNew) {
            $copyObj->setNew(true);
            $copyObj->setId(NULL); // this is a auto-increment column, so set to default value
        }
    }

    /**
     * Makes a copy of this object that will be inserted as a new row in table when saved.
     * It creates a new object filling in the simple attributes, but skipping any primary
     * keys that are defined for the table.
     *
     * If desired, this method can also make copies of all associated (fkey referrers)
     * objects.
     *
     * @param  boolean $deepCopy Whether to also copy all rows that refer (by fkey) to the current row.
     * @return \Moz\User Clone of current object.
     * @throws PropelException
     */
    public function copy($deepCopy = false)
    {
        // we use get_class(), because this might be a subclass
        $clazz = get_class($this);
        $copyObj = new $clazz();
        $this->copyInto($copyObj, $deepCopy);

        return $copyObj;
    }

    /**
     * Declares an association between this object and a ChildPlayer object.
     *
     * @param  ChildPlayer $v
     * @return $this|\Moz\User The current object (for fluent API support)
     * @throws PropelException
     */
    public function setPlayerRelatedByPlayerId(ChildPlayer $v = null)
    {
        if ($v === null) {
            $this->setPlayerId(NULL);
        } else {
            $this->setPlayerId($v->getId());
        }

        $this->aPlayerRelatedByPlayerId = $v;

        // Add binding for other direction of this n:n relationship.
        // If this object has already been added to the ChildPlayer object, it will not be re-added.
        if ($v !== null) {
            $v->addUserRelatedByPlayerId($this);
        }


        return $this;
    }


    /**
     * Get the associated ChildPlayer object
     *
     * @param  ConnectionInterface $con Optional Connection object.
     * @return ChildPlayer The associated ChildPlayer object.
     * @throws PropelException
     */
    public function getPlayerRelatedByPlayerId(ConnectionInterface $con = null)
    {
        if ($this->aPlayerRelatedByPlayerId === null && ($this->player_id !== null)) {
            $this->aPlayerRelatedByPlayerId = ChildPlayerQuery::create()->findPk($this->player_id, $con);
            /* The following can be used additionally to
                guarantee the related object contains a reference
                to this object.  This level of coupling may, however, be
                undesirable since it could result in an only partially populated collection
                in the referenced object.
                $this->aPlayerRelatedByPlayerId->addUsersRelatedByPlayerId($this);
             */
        }

        return $this->aPlayerRelatedByPlayerId;
    }


    /**
     * Initializes a collection based on the name of a relation.
     * Avoids crafting an 'init[$relationName]s' method name
     * that wouldn't work when StandardEnglishPluralizer is used.
     *
     * @param      string $relationName The name of the relation to initialize
     * @return void
     */
    public function initRelation($relationName)
    {
        if ('PlayerRelatedByCreatedByUserId' == $relationName) {
            return $this->initPlayersRelatedByCreatedByUserId();
        }
        if ('Course' == $relationName) {
            return $this->initCourses();
        }
        if ('Layout' == $relationName) {
            return $this->initLayouts();
        }
        if ('Round' == $relationName) {
            return $this->initRounds();
        }
    }

    /**
     * Clears out the collPlayersRelatedByCreatedByUserId collection
     *
     * This does not modify the database; however, it will remove any associated objects, causing
     * them to be refetched by subsequent calls to accessor method.
     *
     * @return void
     * @see        addPlayersRelatedByCreatedByUserId()
     */
    public function clearPlayersRelatedByCreatedByUserId()
    {
        $this->collPlayersRelatedByCreatedByUserId = null; // important to set this to NULL since that means it is uninitialized
    }

    /**
     * Reset is the collPlayersRelatedByCreatedByUserId collection loaded partially.
     */
    public function resetPartialPlayersRelatedByCreatedByUserId($v = true)
    {
        $this->collPlayersRelatedByCreatedByUserIdPartial = $v;
    }

    /**
     * Initializes the collPlayersRelatedByCreatedByUserId collection.
     *
     * By default this just sets the collPlayersRelatedByCreatedByUserId collection to an empty array (like clearcollPlayersRelatedByCreatedByUserId());
     * however, you may wish to override this method in your stub class to provide setting appropriate
     * to your application -- for example, setting the initial array to the values stored in database.
     *
     * @param      boolean $overrideExisting If set to true, the method call initializes
     *                                        the collection even if it is not empty
     *
     * @return void
     */
    public function initPlayersRelatedByCreatedByUserId($overrideExisting = true)
    {
        if (null !== $this->collPlayersRelatedByCreatedByUserId && !$overrideExisting) {
            return;
        }

        $collectionClassName = PlayerTableMap::getTableMap()->getCollectionClassName();

        $this->collPlayersRelatedByCreatedByUserId = new $collectionClassName;
        $this->collPlayersRelatedByCreatedByUserId->setModel('\Moz\Player');
    }

    /**
     * Gets an array of ChildPlayer objects which contain a foreign key that references this object.
     *
     * If the $criteria is not null, it is used to always fetch the results from the database.
     * Otherwise the results are fetched from the database the first time, then cached.
     * Next time the same method is called without $criteria, the cached collection is returned.
     * If this ChildUser is new, it will return
     * an empty collection or the current collection; the criteria is ignored on a new object.
     *
     * @param      Criteria $criteria optional Criteria object to narrow the query
     * @param      ConnectionInterface $con optional connection object
     * @return ObjectCollection|ChildPlayer[] List of ChildPlayer objects
     * @throws PropelException
     */
    public function getPlayersRelatedByCreatedByUserId(Criteria $criteria = null, ConnectionInterface $con = null)
    {
        $partial = $this->collPlayersRelatedByCreatedByUserIdPartial && !$this->isNew();
        if (null === $this->collPlayersRelatedByCreatedByUserId || null !== $criteria  || $partial) {
            if ($this->isNew() && null === $this->collPlayersRelatedByCreatedByUserId) {
                // return empty collection
                $this->initPlayersRelatedByCreatedByUserId();
            } else {
                $collPlayersRelatedByCreatedByUserId = ChildPlayerQuery::create(null, $criteria)
                    ->filterByUserRelatedByCreatedByUserId($this)
                    ->find($con);

                if (null !== $criteria) {
                    if (false !== $this->collPlayersRelatedByCreatedByUserIdPartial && count($collPlayersRelatedByCreatedByUserId)) {
                        $this->initPlayersRelatedByCreatedByUserId(false);

                        foreach ($collPlayersRelatedByCreatedByUserId as $obj) {
                            if (false == $this->collPlayersRelatedByCreatedByUserId->contains($obj)) {
                                $this->collPlayersRelatedByCreatedByUserId->append($obj);
                            }
                        }

                        $this->collPlayersRelatedByCreatedByUserIdPartial = true;
                    }

                    return $collPlayersRelatedByCreatedByUserId;
                }

                if ($partial && $this->collPlayersRelatedByCreatedByUserId) {
                    foreach ($this->collPlayersRelatedByCreatedByUserId as $obj) {
                        if ($obj->isNew()) {
                            $collPlayersRelatedByCreatedByUserId[] = $obj;
                        }
                    }
                }

                $this->collPlayersRelatedByCreatedByUserId = $collPlayersRelatedByCreatedByUserId;
                $this->collPlayersRelatedByCreatedByUserIdPartial = false;
            }
        }

        return $this->collPlayersRelatedByCreatedByUserId;
    }

    /**
     * Sets a collection of ChildPlayer objects related by a one-to-many relationship
     * to the current object.
     * It will also schedule objects for deletion based on a diff between old objects (aka persisted)
     * and new objects from the given Propel collection.
     *
     * @param      Collection $playersRelatedByCreatedByUserId A Propel collection.
     * @param      ConnectionInterface $con Optional connection object
     * @return $this|ChildUser The current object (for fluent API support)
     */
    public function setPlayersRelatedByCreatedByUserId(Collection $playersRelatedByCreatedByUserId, ConnectionInterface $con = null)
    {
        /** @var ChildPlayer[] $playersRelatedByCreatedByUserIdToDelete */
        $playersRelatedByCreatedByUserIdToDelete = $this->getPlayersRelatedByCreatedByUserId(new Criteria(), $con)->diff($playersRelatedByCreatedByUserId);

        
        $this->playersRelatedByCreatedByUserIdScheduledForDeletion = $playersRelatedByCreatedByUserIdToDelete;

        foreach ($playersRelatedByCreatedByUserIdToDelete as $playerRelatedByCreatedByUserIdRemoved) {
            $playerRelatedByCreatedByUserIdRemoved->setUserRelatedByCreatedByUserId(null);
        }

        $this->collPlayersRelatedByCreatedByUserId = null;
        foreach ($playersRelatedByCreatedByUserId as $playerRelatedByCreatedByUserId) {
            $this->addPlayerRelatedByCreatedByUserId($playerRelatedByCreatedByUserId);
        }

        $this->collPlayersRelatedByCreatedByUserId = $playersRelatedByCreatedByUserId;
        $this->collPlayersRelatedByCreatedByUserIdPartial = false;

        return $this;
    }

    /**
     * Returns the number of related Player objects.
     *
     * @param      Criteria $criteria
     * @param      boolean $distinct
     * @param      ConnectionInterface $con
     * @return int             Count of related Player objects.
     * @throws PropelException
     */
    public function countPlayersRelatedByCreatedByUserId(Criteria $criteria = null, $distinct = false, ConnectionInterface $con = null)
    {
        $partial = $this->collPlayersRelatedByCreatedByUserIdPartial && !$this->isNew();
        if (null === $this->collPlayersRelatedByCreatedByUserId || null !== $criteria || $partial) {
            if ($this->isNew() && null === $this->collPlayersRelatedByCreatedByUserId) {
                return 0;
            }

            if ($partial && !$criteria) {
                return count($this->getPlayersRelatedByCreatedByUserId());
            }

            $query = ChildPlayerQuery::create(null, $criteria);
            if ($distinct) {
                $query->distinct();
            }

            return $query
                ->filterByUserRelatedByCreatedByUserId($this)
                ->count($con);
        }

        return count($this->collPlayersRelatedByCreatedByUserId);
    }

    /**
     * Method called to associate a ChildPlayer object to this object
     * through the ChildPlayer foreign key attribute.
     *
     * @param  ChildPlayer $l ChildPlayer
     * @return $this|\Moz\User The current object (for fluent API support)
     */
    public function addPlayerRelatedByCreatedByUserId(ChildPlayer $l)
    {
        if ($this->collPlayersRelatedByCreatedByUserId === null) {
            $this->initPlayersRelatedByCreatedByUserId();
            $this->collPlayersRelatedByCreatedByUserIdPartial = true;
        }

        if (!$this->collPlayersRelatedByCreatedByUserId->contains($l)) {
            $this->doAddPlayerRelatedByCreatedByUserId($l);

            if ($this->playersRelatedByCreatedByUserIdScheduledForDeletion and $this->playersRelatedByCreatedByUserIdScheduledForDeletion->contains($l)) {
                $this->playersRelatedByCreatedByUserIdScheduledForDeletion->remove($this->playersRelatedByCreatedByUserIdScheduledForDeletion->search($l));
            }
        }

        return $this;
    }

    /**
     * @param ChildPlayer $playerRelatedByCreatedByUserId The ChildPlayer object to add.
     */
    protected function doAddPlayerRelatedByCreatedByUserId(ChildPlayer $playerRelatedByCreatedByUserId)
    {
        $this->collPlayersRelatedByCreatedByUserId[]= $playerRelatedByCreatedByUserId;
        $playerRelatedByCreatedByUserId->setUserRelatedByCreatedByUserId($this);
    }

    /**
     * @param  ChildPlayer $playerRelatedByCreatedByUserId The ChildPlayer object to remove.
     * @return $this|ChildUser The current object (for fluent API support)
     */
    public function removePlayerRelatedByCreatedByUserId(ChildPlayer $playerRelatedByCreatedByUserId)
    {
        if ($this->getPlayersRelatedByCreatedByUserId()->contains($playerRelatedByCreatedByUserId)) {
            $pos = $this->collPlayersRelatedByCreatedByUserId->search($playerRelatedByCreatedByUserId);
            $this->collPlayersRelatedByCreatedByUserId->remove($pos);
            if (null === $this->playersRelatedByCreatedByUserIdScheduledForDeletion) {
                $this->playersRelatedByCreatedByUserIdScheduledForDeletion = clone $this->collPlayersRelatedByCreatedByUserId;
                $this->playersRelatedByCreatedByUserIdScheduledForDeletion->clear();
            }
            $this->playersRelatedByCreatedByUserIdScheduledForDeletion[]= $playerRelatedByCreatedByUserId;
            $playerRelatedByCreatedByUserId->setUserRelatedByCreatedByUserId(null);
        }

        return $this;
    }

    /**
     * Clears out the collCourses collection
     *
     * This does not modify the database; however, it will remove any associated objects, causing
     * them to be refetched by subsequent calls to accessor method.
     *
     * @return void
     * @see        addCourses()
     */
    public function clearCourses()
    {
        $this->collCourses = null; // important to set this to NULL since that means it is uninitialized
    }

    /**
     * Reset is the collCourses collection loaded partially.
     */
    public function resetPartialCourses($v = true)
    {
        $this->collCoursesPartial = $v;
    }

    /**
     * Initializes the collCourses collection.
     *
     * By default this just sets the collCourses collection to an empty array (like clearcollCourses());
     * however, you may wish to override this method in your stub class to provide setting appropriate
     * to your application -- for example, setting the initial array to the values stored in database.
     *
     * @param      boolean $overrideExisting If set to true, the method call initializes
     *                                        the collection even if it is not empty
     *
     * @return void
     */
    public function initCourses($overrideExisting = true)
    {
        if (null !== $this->collCourses && !$overrideExisting) {
            return;
        }

        $collectionClassName = CourseTableMap::getTableMap()->getCollectionClassName();

        $this->collCourses = new $collectionClassName;
        $this->collCourses->setModel('\Moz\Course');
    }

    /**
     * Gets an array of ChildCourse objects which contain a foreign key that references this object.
     *
     * If the $criteria is not null, it is used to always fetch the results from the database.
     * Otherwise the results are fetched from the database the first time, then cached.
     * Next time the same method is called without $criteria, the cached collection is returned.
     * If this ChildUser is new, it will return
     * an empty collection or the current collection; the criteria is ignored on a new object.
     *
     * @param      Criteria $criteria optional Criteria object to narrow the query
     * @param      ConnectionInterface $con optional connection object
     * @return ObjectCollection|ChildCourse[] List of ChildCourse objects
     * @throws PropelException
     */
    public function getCourses(Criteria $criteria = null, ConnectionInterface $con = null)
    {
        $partial = $this->collCoursesPartial && !$this->isNew();
        if (null === $this->collCourses || null !== $criteria  || $partial) {
            if ($this->isNew() && null === $this->collCourses) {
                // return empty collection
                $this->initCourses();
            } else {
                $collCourses = ChildCourseQuery::create(null, $criteria)
                    ->filterByUser($this)
                    ->find($con);

                if (null !== $criteria) {
                    if (false !== $this->collCoursesPartial && count($collCourses)) {
                        $this->initCourses(false);

                        foreach ($collCourses as $obj) {
                            if (false == $this->collCourses->contains($obj)) {
                                $this->collCourses->append($obj);
                            }
                        }

                        $this->collCoursesPartial = true;
                    }

                    return $collCourses;
                }

                if ($partial && $this->collCourses) {
                    foreach ($this->collCourses as $obj) {
                        if ($obj->isNew()) {
                            $collCourses[] = $obj;
                        }
                    }
                }

                $this->collCourses = $collCourses;
                $this->collCoursesPartial = false;
            }
        }

        return $this->collCourses;
    }

    /**
     * Sets a collection of ChildCourse objects related by a one-to-many relationship
     * to the current object.
     * It will also schedule objects for deletion based on a diff between old objects (aka persisted)
     * and new objects from the given Propel collection.
     *
     * @param      Collection $courses A Propel collection.
     * @param      ConnectionInterface $con Optional connection object
     * @return $this|ChildUser The current object (for fluent API support)
     */
    public function setCourses(Collection $courses, ConnectionInterface $con = null)
    {
        /** @var ChildCourse[] $coursesToDelete */
        $coursesToDelete = $this->getCourses(new Criteria(), $con)->diff($courses);

        
        $this->coursesScheduledForDeletion = $coursesToDelete;

        foreach ($coursesToDelete as $courseRemoved) {
            $courseRemoved->setUser(null);
        }

        $this->collCourses = null;
        foreach ($courses as $course) {
            $this->addCourse($course);
        }

        $this->collCourses = $courses;
        $this->collCoursesPartial = false;

        return $this;
    }

    /**
     * Returns the number of related Course objects.
     *
     * @param      Criteria $criteria
     * @param      boolean $distinct
     * @param      ConnectionInterface $con
     * @return int             Count of related Course objects.
     * @throws PropelException
     */
    public function countCourses(Criteria $criteria = null, $distinct = false, ConnectionInterface $con = null)
    {
        $partial = $this->collCoursesPartial && !$this->isNew();
        if (null === $this->collCourses || null !== $criteria || $partial) {
            if ($this->isNew() && null === $this->collCourses) {
                return 0;
            }

            if ($partial && !$criteria) {
                return count($this->getCourses());
            }

            $query = ChildCourseQuery::create(null, $criteria);
            if ($distinct) {
                $query->distinct();
            }

            return $query
                ->filterByUser($this)
                ->count($con);
        }

        return count($this->collCourses);
    }

    /**
     * Method called to associate a ChildCourse object to this object
     * through the ChildCourse foreign key attribute.
     *
     * @param  ChildCourse $l ChildCourse
     * @return $this|\Moz\User The current object (for fluent API support)
     */
    public function addCourse(ChildCourse $l)
    {
        if ($this->collCourses === null) {
            $this->initCourses();
            $this->collCoursesPartial = true;
        }

        if (!$this->collCourses->contains($l)) {
            $this->doAddCourse($l);

            if ($this->coursesScheduledForDeletion and $this->coursesScheduledForDeletion->contains($l)) {
                $this->coursesScheduledForDeletion->remove($this->coursesScheduledForDeletion->search($l));
            }
        }

        return $this;
    }

    /**
     * @param ChildCourse $course The ChildCourse object to add.
     */
    protected function doAddCourse(ChildCourse $course)
    {
        $this->collCourses[]= $course;
        $course->setUser($this);
    }

    /**
     * @param  ChildCourse $course The ChildCourse object to remove.
     * @return $this|ChildUser The current object (for fluent API support)
     */
    public function removeCourse(ChildCourse $course)
    {
        if ($this->getCourses()->contains($course)) {
            $pos = $this->collCourses->search($course);
            $this->collCourses->remove($pos);
            if (null === $this->coursesScheduledForDeletion) {
                $this->coursesScheduledForDeletion = clone $this->collCourses;
                $this->coursesScheduledForDeletion->clear();
            }
            $this->coursesScheduledForDeletion[]= $course;
            $course->setUser(null);
        }

        return $this;
    }

    /**
     * Clears out the collLayouts collection
     *
     * This does not modify the database; however, it will remove any associated objects, causing
     * them to be refetched by subsequent calls to accessor method.
     *
     * @return void
     * @see        addLayouts()
     */
    public function clearLayouts()
    {
        $this->collLayouts = null; // important to set this to NULL since that means it is uninitialized
    }

    /**
     * Reset is the collLayouts collection loaded partially.
     */
    public function resetPartialLayouts($v = true)
    {
        $this->collLayoutsPartial = $v;
    }

    /**
     * Initializes the collLayouts collection.
     *
     * By default this just sets the collLayouts collection to an empty array (like clearcollLayouts());
     * however, you may wish to override this method in your stub class to provide setting appropriate
     * to your application -- for example, setting the initial array to the values stored in database.
     *
     * @param      boolean $overrideExisting If set to true, the method call initializes
     *                                        the collection even if it is not empty
     *
     * @return void
     */
    public function initLayouts($overrideExisting = true)
    {
        if (null !== $this->collLayouts && !$overrideExisting) {
            return;
        }

        $collectionClassName = LayoutTableMap::getTableMap()->getCollectionClassName();

        $this->collLayouts = new $collectionClassName;
        $this->collLayouts->setModel('\Moz\Layout');
    }

    /**
     * Gets an array of ChildLayout objects which contain a foreign key that references this object.
     *
     * If the $criteria is not null, it is used to always fetch the results from the database.
     * Otherwise the results are fetched from the database the first time, then cached.
     * Next time the same method is called without $criteria, the cached collection is returned.
     * If this ChildUser is new, it will return
     * an empty collection or the current collection; the criteria is ignored on a new object.
     *
     * @param      Criteria $criteria optional Criteria object to narrow the query
     * @param      ConnectionInterface $con optional connection object
     * @return ObjectCollection|ChildLayout[] List of ChildLayout objects
     * @throws PropelException
     */
    public function getLayouts(Criteria $criteria = null, ConnectionInterface $con = null)
    {
        $partial = $this->collLayoutsPartial && !$this->isNew();
        if (null === $this->collLayouts || null !== $criteria  || $partial) {
            if ($this->isNew() && null === $this->collLayouts) {
                // return empty collection
                $this->initLayouts();
            } else {
                $collLayouts = ChildLayoutQuery::create(null, $criteria)
                    ->filterByUser($this)
                    ->find($con);

                if (null !== $criteria) {
                    if (false !== $this->collLayoutsPartial && count($collLayouts)) {
                        $this->initLayouts(false);

                        foreach ($collLayouts as $obj) {
                            if (false == $this->collLayouts->contains($obj)) {
                                $this->collLayouts->append($obj);
                            }
                        }

                        $this->collLayoutsPartial = true;
                    }

                    return $collLayouts;
                }

                if ($partial && $this->collLayouts) {
                    foreach ($this->collLayouts as $obj) {
                        if ($obj->isNew()) {
                            $collLayouts[] = $obj;
                        }
                    }
                }

                $this->collLayouts = $collLayouts;
                $this->collLayoutsPartial = false;
            }
        }

        return $this->collLayouts;
    }

    /**
     * Sets a collection of ChildLayout objects related by a one-to-many relationship
     * to the current object.
     * It will also schedule objects for deletion based on a diff between old objects (aka persisted)
     * and new objects from the given Propel collection.
     *
     * @param      Collection $layouts A Propel collection.
     * @param      ConnectionInterface $con Optional connection object
     * @return $this|ChildUser The current object (for fluent API support)
     */
    public function setLayouts(Collection $layouts, ConnectionInterface $con = null)
    {
        /** @var ChildLayout[] $layoutsToDelete */
        $layoutsToDelete = $this->getLayouts(new Criteria(), $con)->diff($layouts);

        
        $this->layoutsScheduledForDeletion = $layoutsToDelete;

        foreach ($layoutsToDelete as $layoutRemoved) {
            $layoutRemoved->setUser(null);
        }

        $this->collLayouts = null;
        foreach ($layouts as $layout) {
            $this->addLayout($layout);
        }

        $this->collLayouts = $layouts;
        $this->collLayoutsPartial = false;

        return $this;
    }

    /**
     * Returns the number of related Layout objects.
     *
     * @param      Criteria $criteria
     * @param      boolean $distinct
     * @param      ConnectionInterface $con
     * @return int             Count of related Layout objects.
     * @throws PropelException
     */
    public function countLayouts(Criteria $criteria = null, $distinct = false, ConnectionInterface $con = null)
    {
        $partial = $this->collLayoutsPartial && !$this->isNew();
        if (null === $this->collLayouts || null !== $criteria || $partial) {
            if ($this->isNew() && null === $this->collLayouts) {
                return 0;
            }

            if ($partial && !$criteria) {
                return count($this->getLayouts());
            }

            $query = ChildLayoutQuery::create(null, $criteria);
            if ($distinct) {
                $query->distinct();
            }

            return $query
                ->filterByUser($this)
                ->count($con);
        }

        return count($this->collLayouts);
    }

    /**
     * Method called to associate a ChildLayout object to this object
     * through the ChildLayout foreign key attribute.
     *
     * @param  ChildLayout $l ChildLayout
     * @return $this|\Moz\User The current object (for fluent API support)
     */
    public function addLayout(ChildLayout $l)
    {
        if ($this->collLayouts === null) {
            $this->initLayouts();
            $this->collLayoutsPartial = true;
        }

        if (!$this->collLayouts->contains($l)) {
            $this->doAddLayout($l);

            if ($this->layoutsScheduledForDeletion and $this->layoutsScheduledForDeletion->contains($l)) {
                $this->layoutsScheduledForDeletion->remove($this->layoutsScheduledForDeletion->search($l));
            }
        }

        return $this;
    }

    /**
     * @param ChildLayout $layout The ChildLayout object to add.
     */
    protected function doAddLayout(ChildLayout $layout)
    {
        $this->collLayouts[]= $layout;
        $layout->setUser($this);
    }

    /**
     * @param  ChildLayout $layout The ChildLayout object to remove.
     * @return $this|ChildUser The current object (for fluent API support)
     */
    public function removeLayout(ChildLayout $layout)
    {
        if ($this->getLayouts()->contains($layout)) {
            $pos = $this->collLayouts->search($layout);
            $this->collLayouts->remove($pos);
            if (null === $this->layoutsScheduledForDeletion) {
                $this->layoutsScheduledForDeletion = clone $this->collLayouts;
                $this->layoutsScheduledForDeletion->clear();
            }
            $this->layoutsScheduledForDeletion[]= $layout;
            $layout->setUser(null);
        }

        return $this;
    }


    /**
     * If this collection has already been initialized with
     * an identical criteria, it returns the collection.
     * Otherwise if this User is new, it will return
     * an empty collection; or if this User has previously
     * been saved, it will retrieve related Layouts from storage.
     *
     * This method is protected by default in order to keep the public
     * api reasonable.  You can provide public methods for those you
     * actually need in User.
     *
     * @param      Criteria $criteria optional Criteria object to narrow the query
     * @param      ConnectionInterface $con optional connection object
     * @param      string $joinBehavior optional join type to use (defaults to Criteria::LEFT_JOIN)
     * @return ObjectCollection|ChildLayout[] List of ChildLayout objects
     */
    public function getLayoutsJoinCourse(Criteria $criteria = null, ConnectionInterface $con = null, $joinBehavior = Criteria::LEFT_JOIN)
    {
        $query = ChildLayoutQuery::create(null, $criteria);
        $query->joinWith('Course', $joinBehavior);

        return $this->getLayouts($query, $con);
    }

    /**
     * Clears out the collRounds collection
     *
     * This does not modify the database; however, it will remove any associated objects, causing
     * them to be refetched by subsequent calls to accessor method.
     *
     * @return void
     * @see        addRounds()
     */
    public function clearRounds()
    {
        $this->collRounds = null; // important to set this to NULL since that means it is uninitialized
    }

    /**
     * Reset is the collRounds collection loaded partially.
     */
    public function resetPartialRounds($v = true)
    {
        $this->collRoundsPartial = $v;
    }

    /**
     * Initializes the collRounds collection.
     *
     * By default this just sets the collRounds collection to an empty array (like clearcollRounds());
     * however, you may wish to override this method in your stub class to provide setting appropriate
     * to your application -- for example, setting the initial array to the values stored in database.
     *
     * @param      boolean $overrideExisting If set to true, the method call initializes
     *                                        the collection even if it is not empty
     *
     * @return void
     */
    public function initRounds($overrideExisting = true)
    {
        if (null !== $this->collRounds && !$overrideExisting) {
            return;
        }

        $collectionClassName = RoundTableMap::getTableMap()->getCollectionClassName();

        $this->collRounds = new $collectionClassName;
        $this->collRounds->setModel('\Moz\Round');
    }

    /**
     * Gets an array of ChildRound objects which contain a foreign key that references this object.
     *
     * If the $criteria is not null, it is used to always fetch the results from the database.
     * Otherwise the results are fetched from the database the first time, then cached.
     * Next time the same method is called without $criteria, the cached collection is returned.
     * If this ChildUser is new, it will return
     * an empty collection or the current collection; the criteria is ignored on a new object.
     *
     * @param      Criteria $criteria optional Criteria object to narrow the query
     * @param      ConnectionInterface $con optional connection object
     * @return ObjectCollection|ChildRound[] List of ChildRound objects
     * @throws PropelException
     */
    public function getRounds(Criteria $criteria = null, ConnectionInterface $con = null)
    {
        $partial = $this->collRoundsPartial && !$this->isNew();
        if (null === $this->collRounds || null !== $criteria  || $partial) {
            if ($this->isNew() && null === $this->collRounds) {
                // return empty collection
                $this->initRounds();
            } else {
                $collRounds = ChildRoundQuery::create(null, $criteria)
                    ->filterByUser($this)
                    ->find($con);

                if (null !== $criteria) {
                    if (false !== $this->collRoundsPartial && count($collRounds)) {
                        $this->initRounds(false);

                        foreach ($collRounds as $obj) {
                            if (false == $this->collRounds->contains($obj)) {
                                $this->collRounds->append($obj);
                            }
                        }

                        $this->collRoundsPartial = true;
                    }

                    return $collRounds;
                }

                if ($partial && $this->collRounds) {
                    foreach ($this->collRounds as $obj) {
                        if ($obj->isNew()) {
                            $collRounds[] = $obj;
                        }
                    }
                }

                $this->collRounds = $collRounds;
                $this->collRoundsPartial = false;
            }
        }

        return $this->collRounds;
    }

    /**
     * Sets a collection of ChildRound objects related by a one-to-many relationship
     * to the current object.
     * It will also schedule objects for deletion based on a diff between old objects (aka persisted)
     * and new objects from the given Propel collection.
     *
     * @param      Collection $rounds A Propel collection.
     * @param      ConnectionInterface $con Optional connection object
     * @return $this|ChildUser The current object (for fluent API support)
     */
    public function setRounds(Collection $rounds, ConnectionInterface $con = null)
    {
        /** @var ChildRound[] $roundsToDelete */
        $roundsToDelete = $this->getRounds(new Criteria(), $con)->diff($rounds);

        
        $this->roundsScheduledForDeletion = $roundsToDelete;

        foreach ($roundsToDelete as $roundRemoved) {
            $roundRemoved->setUser(null);
        }

        $this->collRounds = null;
        foreach ($rounds as $round) {
            $this->addRound($round);
        }

        $this->collRounds = $rounds;
        $this->collRoundsPartial = false;

        return $this;
    }

    /**
     * Returns the number of related Round objects.
     *
     * @param      Criteria $criteria
     * @param      boolean $distinct
     * @param      ConnectionInterface $con
     * @return int             Count of related Round objects.
     * @throws PropelException
     */
    public function countRounds(Criteria $criteria = null, $distinct = false, ConnectionInterface $con = null)
    {
        $partial = $this->collRoundsPartial && !$this->isNew();
        if (null === $this->collRounds || null !== $criteria || $partial) {
            if ($this->isNew() && null === $this->collRounds) {
                return 0;
            }

            if ($partial && !$criteria) {
                return count($this->getRounds());
            }

            $query = ChildRoundQuery::create(null, $criteria);
            if ($distinct) {
                $query->distinct();
            }

            return $query
                ->filterByUser($this)
                ->count($con);
        }

        return count($this->collRounds);
    }

    /**
     * Method called to associate a ChildRound object to this object
     * through the ChildRound foreign key attribute.
     *
     * @param  ChildRound $l ChildRound
     * @return $this|\Moz\User The current object (for fluent API support)
     */
    public function addRound(ChildRound $l)
    {
        if ($this->collRounds === null) {
            $this->initRounds();
            $this->collRoundsPartial = true;
        }

        if (!$this->collRounds->contains($l)) {
            $this->doAddRound($l);

            if ($this->roundsScheduledForDeletion and $this->roundsScheduledForDeletion->contains($l)) {
                $this->roundsScheduledForDeletion->remove($this->roundsScheduledForDeletion->search($l));
            }
        }

        return $this;
    }

    /**
     * @param ChildRound $round The ChildRound object to add.
     */
    protected function doAddRound(ChildRound $round)
    {
        $this->collRounds[]= $round;
        $round->setUser($this);
    }

    /**
     * @param  ChildRound $round The ChildRound object to remove.
     * @return $this|ChildUser The current object (for fluent API support)
     */
    public function removeRound(ChildRound $round)
    {
        if ($this->getRounds()->contains($round)) {
            $pos = $this->collRounds->search($round);
            $this->collRounds->remove($pos);
            if (null === $this->roundsScheduledForDeletion) {
                $this->roundsScheduledForDeletion = clone $this->collRounds;
                $this->roundsScheduledForDeletion->clear();
            }
            $this->roundsScheduledForDeletion[]= clone $round;
            $round->setUser(null);
        }

        return $this;
    }


    /**
     * If this collection has already been initialized with
     * an identical criteria, it returns the collection.
     * Otherwise if this User is new, it will return
     * an empty collection; or if this User has previously
     * been saved, it will retrieve related Rounds from storage.
     *
     * This method is protected by default in order to keep the public
     * api reasonable.  You can provide public methods for those you
     * actually need in User.
     *
     * @param      Criteria $criteria optional Criteria object to narrow the query
     * @param      ConnectionInterface $con optional connection object
     * @param      string $joinBehavior optional join type to use (defaults to Criteria::LEFT_JOIN)
     * @return ObjectCollection|ChildRound[] List of ChildRound objects
     */
    public function getRoundsJoinLayout(Criteria $criteria = null, ConnectionInterface $con = null, $joinBehavior = Criteria::LEFT_JOIN)
    {
        $query = ChildRoundQuery::create(null, $criteria);
        $query->joinWith('Layout', $joinBehavior);

        return $this->getRounds($query, $con);
    }

    /**
     * Clears the current object, sets all attributes to their default values and removes
     * outgoing references as well as back-references (from other objects to this one. Results probably in a database
     * change of those foreign objects when you call `save` there).
     */
    public function clear()
    {
        if (null !== $this->aPlayerRelatedByPlayerId) {
            $this->aPlayerRelatedByPlayerId->removeUserRelatedByPlayerId($this);
        }
        $this->id = null;
        $this->username = null;
        $this->password = null;
        $this->role = null;
        $this->player_id = null;
        $this->time_created = null;
        $this->state = null;
        $this->alreadyInSave = false;
        $this->clearAllReferences();
        $this->applyDefaultValues();
        $this->resetModified();
        $this->setNew(true);
        $this->setDeleted(false);
    }

    /**
     * Resets all references and back-references to other model objects or collections of model objects.
     *
     * This method is used to reset all php object references (not the actual reference in the database).
     * Necessary for object serialisation.
     *
     * @param      boolean $deep Whether to also clear the references on all referrer objects.
     */
    public function clearAllReferences($deep = false)
    {
        if ($deep) {
            if ($this->collPlayersRelatedByCreatedByUserId) {
                foreach ($this->collPlayersRelatedByCreatedByUserId as $o) {
                    $o->clearAllReferences($deep);
                }
            }
            if ($this->collCourses) {
                foreach ($this->collCourses as $o) {
                    $o->clearAllReferences($deep);
                }
            }
            if ($this->collLayouts) {
                foreach ($this->collLayouts as $o) {
                    $o->clearAllReferences($deep);
                }
            }
            if ($this->collRounds) {
                foreach ($this->collRounds as $o) {
                    $o->clearAllReferences($deep);
                }
            }
        } // if ($deep)

        $this->collPlayersRelatedByCreatedByUserId = null;
        $this->collCourses = null;
        $this->collLayouts = null;
        $this->collRounds = null;
        $this->aPlayerRelatedByPlayerId = null;
    }

    /**
     * Return the string representation of this object
     *
     * @return string
     */
    public function __toString()
    {
        return (string) $this->exportTo(UserTableMap::DEFAULT_STRING_FORMAT);
    }

    /**
     * Code to be run before persisting the object
     * @param  ConnectionInterface $con
     * @return boolean
     */
    public function preSave(ConnectionInterface $con = null)
    {
        if (is_callable('parent::preSave')) {
            return parent::preSave($con);
        }
        return true;
    }

    /**
     * Code to be run after persisting the object
     * @param ConnectionInterface $con
     */
    public function postSave(ConnectionInterface $con = null)
    {
        if (is_callable('parent::postSave')) {
            parent::postSave($con);
        }
    }

    /**
     * Code to be run before inserting to database
     * @param  ConnectionInterface $con
     * @return boolean
     */
    public function preInsert(ConnectionInterface $con = null)
    {
        if (is_callable('parent::preInsert')) {
            return parent::preInsert($con);
        }
        return true;
    }

    /**
     * Code to be run after inserting to database
     * @param ConnectionInterface $con
     */
    public function postInsert(ConnectionInterface $con = null)
    {
        if (is_callable('parent::postInsert')) {
            parent::postInsert($con);
        }
    }

    /**
     * Code to be run before updating the object in database
     * @param  ConnectionInterface $con
     * @return boolean
     */
    public function preUpdate(ConnectionInterface $con = null)
    {
        if (is_callable('parent::preUpdate')) {
            return parent::preUpdate($con);
        }
        return true;
    }

    /**
     * Code to be run after updating the object in database
     * @param ConnectionInterface $con
     */
    public function postUpdate(ConnectionInterface $con = null)
    {
        if (is_callable('parent::postUpdate')) {
            parent::postUpdate($con);
        }
    }

    /**
     * Code to be run before deleting the object in database
     * @param  ConnectionInterface $con
     * @return boolean
     */
    public function preDelete(ConnectionInterface $con = null)
    {
        if (is_callable('parent::preDelete')) {
            return parent::preDelete($con);
        }
        return true;
    }

    /**
     * Code to be run after deleting the object in database
     * @param ConnectionInterface $con
     */
    public function postDelete(ConnectionInterface $con = null)
    {
        if (is_callable('parent::postDelete')) {
            parent::postDelete($con);
        }
    }


    /**
     * Derived method to catches calls to undefined methods.
     *
     * Provides magic import/export method support (fromXML()/toXML(), fromYAML()/toYAML(), etc.).
     * Allows to define default __call() behavior if you overwrite __call()
     *
     * @param string $name
     * @param mixed  $params
     *
     * @return array|string
     */
    public function __call($name, $params)
    {
        if (0 === strpos($name, 'get')) {
            $virtualColumn = substr($name, 3);
            if ($this->hasVirtualColumn($virtualColumn)) {
                return $this->getVirtualColumn($virtualColumn);
            }

            $virtualColumn = lcfirst($virtualColumn);
            if ($this->hasVirtualColumn($virtualColumn)) {
                return $this->getVirtualColumn($virtualColumn);
            }
        }

        if (0 === strpos($name, 'from')) {
            $format = substr($name, 4);

            return $this->importFrom($format, reset($params));
        }

        if (0 === strpos($name, 'to')) {
            $format = substr($name, 2);
            $includeLazyLoadColumns = isset($params[0]) ? $params[0] : true;

            return $this->exportTo($format, $includeLazyLoadColumns);
        }

        throw new BadMethodCallException(sprintf('Call to undefined method: %s.', $name));
    }

}
