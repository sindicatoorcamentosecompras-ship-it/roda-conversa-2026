async function login() {
  const senha = document.getElementById("senha").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ senha })
  });

  if (response.ok) {
    document.getElementById("painel").style.display = "block";
    carregarLista();
  } else {
    alert("Senha incorreta");
  }
}

async function carregarLista() {
  const response = await fetch("/lista");
  const dados = await response.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  dados.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nome}</strong><br>
      Município: ${item.municipio}<br>
      Telefone: ${item.telefone}<br>
      Presença: ${item.presenca}<br>
      Observações: ${item.observacoes || "-"}
      <hr>
    `;
    lista.appendChild(li);
  });
}
