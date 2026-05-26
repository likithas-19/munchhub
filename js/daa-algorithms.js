// Munch Hub - Design and Analysis of Algorithms (DAA) Implementations

// 1. TRIE DATA STRUCTURE (Fast prefix-based autocomplete search for menu items)
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.foodItem = null; // Store reference to food object directly
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert a food item into the Trie (based on food name and tags)
    insert(food) {
        const wordsToInsert = [food.name.toLowerCase(), food.category.toLowerCase(), ...food.description.toLowerCase().split(/\s+/)];
        
        wordsToInsert.forEach(word => {
            // Clean word (letters & numbers only)
            const cleanWord = word.replace(/[^a-z0-9]/g, '');
            if (cleanWord.length === 0) return;
            
            let current = this.root;
            for (let i = 0; i < cleanWord.length; i++) {
                const char = cleanWord[i];
                if (!current.children[char]) {
                    current.children[char] = new TrieNode();
                }
                current = current.children[char];
            }
            current.isEndOfWord = true;
            current.foodItem = food;
        });
    }

    // Search foods by prefix. Returns matches
    search(prefix) {
        const cleanPrefix = prefix.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleanPrefix.length === 0) return [];

        let current = this.root;
        for (let i = 0; i < cleanPrefix.length; i++) {
            const char = cleanPrefix[i];
            if (!current.children[char]) {
                return []; // Prefix not found
            }
            current = current.children[char];
        }

        // Prefix found. Gather all food items in its subtree (Depth First Search)
        const results = new Map(); // Use Map to avoid duplicates
        this._collectAll(current, results);
        return Array.from(results.values());
    }

    _collectAll(node, results) {
        if (node.isEndOfWord && node.foodItem) {
            results.set(node.foodItem.id, node.foodItem);
        }
        for (const char in node.children) {
            this._collectAll(node.children[char], results);
        }
    }
}

// 2. 0/1 KNAPSACK ALGORITHM (Budget Optimizer)
// W = Budget Capacity, weights = prices of foods, values = ratings/popularity, items = array of food items
function solveBudgetKnapsack(budget, items, utilityCriteria = 'rating') {
    const n = items.length;
    
    // Convert float ratings to integers for cleaner knapsack DP values
    const getItemValue = (item) => {
        if (utilityCriteria === 'calories') return item.calories;
        if (utilityCriteria === 'popularity') return item.popularity;
        return Math.round(item.rating * 20); // Scale up (4.5 rating -> 90 value)
    };

    // DP Table creation (budget+1) x (n+1)
    const K = Array(n + 1).fill(null).map(() => Array(budget + 1).fill(0));

    // Fill knapsack DP matrix
    for (let i = 1; i <= n; i++) {
        const item = items[i - 1];
        const weight = item.price; // Weight is the cost
        const val = getItemValue(item); // Value is the utility

        for (let w = 0; w <= budget; w++) {
            if (weight <= w) {
                K[i][w] = Math.max(val + K[i - 1][w - weight], K[i - 1][w]);
            } else {
                K[i][w] = K[i - 1][w];
            }
        }
    }

    // Backtrack to find chosen items
    let w = budget;
    const selectedItems = [];
    
    for (let i = n; i > 0 && w > 0; i--) {
        const item = items[i - 1];
        const weight = item.price;

        // If the value is different from the row above, item was chosen!
        if (K[i][w] !== K[i - 1][w]) {
            selectedItems.push(item);
            w -= weight;
        }
    }

    const totalSpent = selectedItems.reduce((sum, item) => sum + item.price, 0);
    const totalUtility = selectedItems.reduce((sum, item) => sum + (utilityCriteria === 'calories' ? item.calories : item.rating), 0);

    return {
        selectedItems,
        totalSpent,
        totalUtility: utilityCriteria === 'calories' ? totalUtility : (totalUtility / selectedItems.length || 0).toFixed(2),
        matrix: K // Return table for visual DAA debugging!
    };
}

// 3. SORTING ALGORITHMS (Merge Sort & Heap Sort for Trending food sorting)
// Heap Sort implementation for sorting food objects by key (popularity, price, rating)
function heapSort(arr, key, ascending = true) {
    const list = [...arr];
    const n = list.length;

    // Helper to get nested value
    const getVal = (obj) => obj[key];

    const heapify = (size, idx) => {
        let extreme = idx;
        const left = 2 * idx + 1;
        const right = 2 * idx + 2;

        if (ascending) {
            if (left < size && getVal(list[left]) > getVal(list[extreme])) extreme = left;
            if (right < size && getVal(list[right]) > getVal(list[extreme])) extreme = right;
        } else {
            // Descending
            if (left < size && getVal(list[left]) < getVal(list[extreme])) extreme = left;
            if (right < size && getVal(list[right]) < getVal(list[extreme])) extreme = right;
        }

        if (extreme !== idx) {
            // Swap
            [list[idx], list[extreme]] = [list[extreme], list[idx]];
            heapify(size, extreme);
        }
    };

    // Build Max-Heap (or Min-Heap)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [list[0], list[i]] = [list[i], list[0]];
        heapify(i, 0);
    }

    return list;
}

// Merge Sort (Divide & Conquer)
function mergeSort(arr, key, ascending = true) {
    const list = [...arr];
    if (list.length <= 1) return list;

    const mid = Math.floor(list.length / 2);
    const left = mergeSort(list.slice(0, mid), key, ascending);
    const right = mergeSort(list.slice(mid), key, ascending);

    return merge(left, right, key, ascending);
}

function merge(left, right, key, ascending) {
    const result = [];
    let lIdx = 0;
    let rIdx = 0;

    const comp = (a, b) => {
        return ascending ? a[key] < b[key] : a[key] > b[key];
    };

    while (lIdx < left.length && rIdx < right.length) {
        if (comp(left[lIdx], right[rIdx])) {
            result.push(left[lIdx]);
            lIdx++;
        } else {
            result.push(right[rIdx]);
            rIdx++;
        }
    }

    return result.concat(left.slice(lIdx)).concat(right.slice(rIdx));
}

// 4. DIJKSTRA'S ALGORITHM (Shortest path router for campus delivery simulation)
function dijkstra(graph, startNode, endNode) {
    const nodes = graph.nodes;
    const edges = graph.edges;

    const distances = {};
    const previous = {};
    const unvisited = new Set();

    // Initialize values
    nodes.forEach(node => {
        distances[node.id] = Infinity;
        previous[node.id] = null;
        unvisited.add(node.id);
    });

    distances[startNode] = 0;

    while (unvisited.size > 0) {
        // Find node in unvisited with smallest distance
        let current = null;
        unvisited.forEach(nodeId => {
            if (current === null || distances[nodeId] < distances[current]) {
                current = nodeId;
            }
        });

        // If target reached or smallest is Infinity, we are done
        if (current === endNode || distances[current] === Infinity) {
            break;
        }

        unvisited.delete(current);

        // Get neighbors
        const neighbors = edges.filter(edge => edge.from === current || edge.to === current);
        neighbors.forEach(edge => {
            const neighbor = edge.from === current ? edge.to : edge.from;
            if (unvisited.has(neighbor)) {
                const alt = distances[current] + edge.weight;
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = current;
                }
            }
        });
    }

    // Reconstruct shortest path
    const path = [];
    let u = endNode;
    while (u !== null) {
        path.unshift(u);
        u = previous[u];
    }

    return {
        path,
        distance: distances[endNode],
        allDistances: distances
    };
}

// 5. MINIMUM SPANNING TREE (Kruskal's Algorithm for Group Order Common Delivery Pickup Spot)
class DisjointSet {
    constructor(elements) {
        this.parent = {};
        elements.forEach(el => this.parent[el] = el);
    }
    find(i) {
        if (this.parent[i] === i) return i;
        return this.find(this.parent[i]);
    }
    union(i, j) {
        const rootI = this.find(i);
        const rootJ = this.find(j);
        if (rootI !== rootJ) {
            this.parent[rootI] = rootJ;
            return true;
        }
        return false;
    }
}

function solveMSTKruskal(subgraphNodes, fullGraphEdges) {
    // Collect all edges where both endpoints are in subgraphNodes
    const subgraphEdges = fullGraphEdges.filter(edge => 
        subgraphNodes.includes(edge.from) && subgraphNodes.includes(edge.to)
    );

    // Sort edges by weight
    subgraphEdges.sort((a, b) => a.weight - b.weight);

    const ds = new DisjointSet(subgraphNodes);
    const mstEdges = [];
    let totalWeight = 0;

    subgraphEdges.forEach(edge => {
        if (ds.union(edge.from, edge.to)) {
            mstEdges.push(edge);
            totalWeight += edge.weight;
        }
    });

    // Identify the "center node" - node with lowest average distance in MST or node with highest degree
    const degrees = {};
    subgraphNodes.forEach(node => degrees[node] = 0);
    mstEdges.forEach(edge => {
        degrees[edge.from]++;
        degrees[edge.to]++;
    });

    let centralNode = subgraphNodes[0];
    let maxDegree = -1;
    subgraphNodes.forEach(node => {
        if (degrees[node] > maxDegree) {
            maxDegree = degrees[node];
            centralNode = node;
        }
    });

    return {
        mstEdges,
        totalWeight,
        centralNode // Serves as the visual central pickup point!
    };
}

// Export modules if in Node, otherwise bind globally to window
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Trie, solveBudgetKnapsack, heapSort, mergeSort, dijkstra, solveMSTKruskal };
} else {
    window.Trie = Trie;
    window.solveBudgetKnapsack = solveBudgetKnapsack;
    window.heapSort = heapSort;
    window.mergeSort = mergeSort;
    window.dijkstra = dijkstra;
    window.solveMSTKruskal = solveMSTKruskal;
}
