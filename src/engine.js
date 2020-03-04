function rollDice() {
  return Math.floor(Math.random() * Math.floor(6)) + 1;
}

function takeTurn(roll, prev, curr) {
  let shipped = 0;

  if (roll >= prev) {
    shipped = prev;
    curr = prev + curr;
    prev = 0;
  } else {
    shipped = roll;
    curr = curr + roll;
    prev = prev - roll;
  }

  return [prev, curr, shipped];
}

export const createActors = () => {
  console.log("createActors");

  return [
    { capacity: 0, requestHistory: [], shipHistory: [] },
    { capacity: 0, requestHistory: [], shipHistory: [] },
    { capacity: 0, requestHistory: [], shipHistory: [] },
    { capacity: 0, requestHistory: [], shipHistory: [] },
    { capacity: 0, requestHistory: [], shipHistory: [] }
  ];
};

export const nextState = (supply, actors) => {
  console.log("nextState");
  let roll;

  for (let i = 0; i < actors.length; i++) {
    roll = rollDice();
    actors[i].requestHistory.push(roll);

    if (i === 0) {
      actors[i].capacity = actors[i].capacity+=roll;
    } else {
      const [prev, current, shipped] = takeTurn(roll, actors[i-1].capacity, actors[i].capacity);

      actors[i-1].capacity = prev;
      actors[i-1].shipHistory.push(shipped);
      actors[i].capacity = current
    }
  }

  roll = rollDice();
  const [prev, current, shipped] = takeTurn(roll, actors[actors.length - 1].capacity, supply);

  actors[actors.length - 1].capacity = prev;
  actors[actors.length - 1].shipHistory.push(shipped);
  supply = current;

  return {
    supply,
    actors
  };
};

