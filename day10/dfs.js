function dfs(maze, visited, row, col) {
  if (
    row < 0 ||
    row >= maze.length ||
    col < 0 ||
    col >= maze[0].length ||
    maze[row][col] === 'L' ||
    visited[row][col]
  ) {
    return 0;
  }

  visited[row][col] = true;
  let count = 1;

  // Explore os vizinhos em todas as direções
  count += dfs(maze, visited, row - 1, col); // Vizinho superior
  count += dfs(maze, visited, row + 1, col); // Vizinho inferior
  count += dfs(maze, visited, row, col - 1); // Vizinho esquerdo
  count += dfs(maze, visited, row, col + 1); // Vizinho direito

  return count;
}

function countEnclosedDots(maze) {
  if (!maze || maze.length === 0 || maze[0].length === 0) {
    return 0;
  }

  const rows = maze.length;
  const cols = maze[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  let enclosedDotCount = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (maze[i][j] === '.' && !visited[i][j]) {
        // Se o ponto não foi visitado e não está cercado por paredes, inicia uma busca DFS
        const dotCount = dfs(maze, visited, i, j);
        enclosedDotCount += dotCount > 0 ? 1 : 0;
      }
    }
  }

  return enclosedDotCount;
}

// // Exemplo de uso com o labirinto fornecido
// const maze = [
//   ['.', '.', '.', '.', '.'],
//   ['.', 'L', 'L', 'L', '.'],
//   ['.', 'L', '.', 'L', '.'],
//   ['.', 'L', 'L', 'L', '.'],
//   ['.', '.', '.', '.', '.']
// ];

// const result = countEnclosedDots(maze);
// console.log(`Quantidade de pontos cercados por paredes: ${result}`);

module.exports = {
  countEnclosedDots,
};
