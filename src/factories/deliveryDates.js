import addDays from 'date-fns/addDays/index.js';
import addMonths from 'date-fns/addMonths/index.js';
import eachDayOfInterval from 'date-fns/eachDayOfInterval/index.js';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval/index.js';
import isMonday from 'date-fns/isMonday/index.js';
import isWednesday from 'date-fns/isWednesday/index.js';
import isFriday from 'date-fns/isFriday/index.js';
import nextMonday from 'date-fns/nextMonday/index.js';
import nextWednesday from 'date-fns/nextWednesday/index.js';
import nextFriday from 'date-fns/nextFriday/index.js';
import isWeekend from 'date-fns/isWeekend/index.js';
import { getDate, set } from 'date-fns/index.js';
import format from 'date-fns/format/index.js';
import { pt } from 'date-fns/locale/index.js';

export function weeklyDatesFactory(weekday) {
  const today = new Date();
  const todayIsMonday = isMonday(today);
  const todayIsWednesday = isWednesday(today);
  const todayIsFriday = isFriday(today);
  const willDeliverToday = todayIsMonday || todayIsWednesday || todayIsFriday;

  if (willDeliverToday) {
    const deliveryDates = eachDayOfInterval(
      {
        start: today,
        end: addDays(today, 14),
      },
      { step: 7 }
    );

    for (let i = 0; i < deliveryDates.length; i += 1) {
      deliveryDates[i] = format(deliveryDates[i], 'P', { locale: pt });
    }

    return deliveryDates;
  }

  if (weekday === 'Segunda') {
    const deliveryDates = eachDayOfInterval(
      {
        start: nextMonday(today),
        end: addDays(nextMonday(today), 14),
      },
      { step: 7 }
    );

    for (let i = 0; i < deliveryDates.length; i += 1) {
      deliveryDates[i] = format(deliveryDates[i], 'P', { locale: pt });
    }

    return deliveryDates;
  }

  if (weekday === 'Quarta') {
    const deliveryDates = eachDayOfInterval(
      {
        start: nextWednesday(today),
        end: addDays(nextWednesday(today), 14),
      },
      { step: 7 }
    );

    for (let i = 0; i < deliveryDates.length; i += 1) {
      deliveryDates[i] = format(deliveryDates[i], 'P', { locale: pt });
    }

    return deliveryDates;
  }

  const deliveryDates = eachDayOfInterval(
    {
      start: nextFriday(today),
      end: addDays(nextFriday(today), 14),
    },
    { step: 7 }
  );

  for (let i = 0; i < deliveryDates.length; i += 1) {
    deliveryDates[i] = format(deliveryDates[i], 'P', { locale: pt });
  }
  return deliveryDates;
}

export function monthlyDatesFactory(deliverDay) {
  const day = deliverDay.replace('Dia ', '');
  const today = new Date();
  const todaysDay = getDate(today);

  if (todaysDay === +day) {
    const deliveryDates = eachMonthOfInterval({
      start: today,
      end: addMonths(today, 2),
    });

    for (let i = 0; i < deliveryDates.length; i += 1) {
      deliveryDates[i] = format(set(deliveryDates[i], { date: day }), 'P', {
        locale: pt,
      });
    }

    return deliveryDates;
  }

  const deliveryDates = eachMonthOfInterval({
    start: addMonths(today, 1),
    end: addMonths(today, 3),
  });

  for (let i = 0; i < deliveryDates.length; i += 1) {
    deliveryDates[i] = set(deliveryDates[i], { date: day });
  }

  for (let i = 0; i < deliveryDates.length; i += 1) {
    if (isWeekend(deliveryDates[i])) {
      deliveryDates[i] = format(nextMonday(deliveryDates[i]), 'P', {
        locale: pt,
      });
    } else {
      deliveryDates[i] = format(deliveryDates[i], 'P', { locale: pt });
    }
  }

  return deliveryDates;
}
