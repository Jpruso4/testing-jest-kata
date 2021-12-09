import { createEvent} from './functions'

beforeAll(() => { 
    global.Date.now = jest.fn(() => new Date('2020-12-07T10:20:30Z').getTime()) 
});

test('Validation a event title and content basic', () => {
    const weekday = "mon";
    const week = 1;
    const openHour=8;
    const closeHour=14

    const result = createEvent(weekday, week, openHour, closeHour);

    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual([6, 'hour']);
});

test('Validation start date', () => {
    const weekday = "thu";  
    const week = 1;
    const openHour = 10;
    const closeHour = 11;
    
    const date = new Date();
    const result = createEvent(weekday, week, openHour, closeHour);

    expect(result.start).toEqual(date);
});

test('Validation date', () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const startDate = new Date();

    const weekday = "thu";
    const week = 1;
    const openHour = 8;
    const closeHour = 14;
    const result = createEvent(weekday, week, openHour, closeHour);

    expect(result.date).toBe(startDate.toLocaleDateString('es-ES', options));
});

test('Validation illegal arguments', () => {
    const weekday = "Lun";  
    const week = 3;
    const openHour = 10;
    const closeHour = 11;

    expect(() => createEvent(weekday, week, openHour, closeHour)).toThrow(Error);
});

test('create an event list of at least 10 events', () => {
    const listEvent = [
        {
            weekday: 'mon',
            week: 1,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'tue',
            week: 2,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'wed',
            week: 3,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'thu',
            week: 4,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'mon',
            week: 5,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'tue',
            week: 1,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'wed',
            week: 8,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'thu',
            week: 1,
            openHour: 8,
            closeHour: 14
        }
        
    ]

    listEvent.map(eventData => {
        const duration = [eventData.closeHour - eventData.openHour, "hour"];

        const result = createEvent(eventData.weekday, eventData.week, eventData.openHour, eventData.closeHour )
        
        expect(result.title).toBe("[SOFKA U] Meeting Room");
        expect(result.description).toBe("Mentoring and Practice");
        expect(result.duration).toEqual(duration);
    })
});