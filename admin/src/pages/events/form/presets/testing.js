import moment from 'moment';

export default () => {
    return [
        {
            name: 'Testing',
            description: '',
            type: 'LESSON',
            lesson_level: 'BEGINNERS',
            start: moment().toISOString(),
            end: moment().toISOString(),
            employee: null
        },
    ];
};