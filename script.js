<script>
  const votes = {
    Alyssa: 0,
    Jada: 0,
    Mia: 0,
    Zoe: 0
  };

  const storageKey = "herHoopsVote";
  const voteMessage = document.getElementById("voteMessage");

  function updateResults() {
    const totalVotes = Object.values(votes).reduce((sum, value) => sum + value, 0);

    for (const player in votes) {
      const countEl = document.getElementById(`count-${player}`);
      const barEl = document.getElementById(`bar-${player}`);
      const playerVotes = votes[player];
      const percent = totalVotes === 0 ? 0 : (playerVotes / totalVotes) * 100;

      countEl.textContent = `${playerVotes} vote${playerVotes !== 1 ? "s" : ""}`;
      barEl.style.width = `${percent}%`;
    }
  }

  function loadSavedVote() {
    const savedVote = localStorage.getItem(storageKey);
    if (savedVote && votes.hasOwnProperty(savedVote)) {
      votes[savedVote] = 1;
      document.querySelectorAll(".vote-btn").forEach(btn => {
        btn.disabled = true;
        btn.textContent = "Voted";
      });
      voteMessage.textContent = `You already voted for ${savedVote}.`;
    }
    updateResults();
  }

  document.querySelectorAll(".player-card").forEach(card => {
    const player = card.dataset.player;
    const button = card.querySelector(".vote-btn");

    button.addEventListener("click", () => {
      if (localStorage.getItem(storageKey)) {
        voteMessage.textContent = "You have already voted.";
        return;
      }

      votes[player] += 1;
      localStorage.setItem(storageKey, player);

      document.querySelectorAll(".vote-btn").forEach(btn => {
        btn.disabled = true;
        btn.textContent = "Voted";
      });

      voteMessage.textContent = `Thanks for voting for ${player}!`;
      updateResults();
    });
  });

  loadSavedVote();
</script>
