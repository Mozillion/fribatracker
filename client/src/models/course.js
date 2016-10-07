class QueryBuilder {
    constructor(table, category) {
        this.query = {
            table,
            category,
        };
    }

    findAll() {
        return this.query;
    }
}


class ActiveRecord {
    constructor() {
        this.synced = false;
        this.serverId = null;
    }

    static query(category) {
        return new QueryBuilder(this.table, category);
    }
}


class Course extends ActiveRecord {
    static table = 'courses';

    constructor({name, rating, fairways}) {
        super();
        this.name = name;
        this.rating = rating;
        this.fairways = fairways;
    }
}

export default Course;
