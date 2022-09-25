k = 2;
class Node {
	constructor(point, axis) {
		this.point = point;
		this.left = null;
		this.right = null;
		this.axis = axis;
	}
}

function getHeight(node) {
	if (node == null)
		return 0;
	return max(1 + getHeight(node.left), 1 + getHeight(node.right))
}

function generate_dot(node) {
	var cad = '';
	if (node == null)
		return '';

	if (node.left != null) {
		cad = cad + '"' + node.point.toString() + "\"";
		cad = cad + " -> " + '"' + node.left.point.toString() + '"' + ";" + "\n";
	}
	if (node.right != null) {
		cad = cad + "\"" + node.point.toString() + "\"";
		cad = cad + " -> " + '"' + node.right.point.toString() + '"' + ";" + "\n";
	}
	return cad + generate_dot(node.left) + generate_dot(node.right);
}

function build_kdtree(points, depth = 0) {
	var n = points.length;
	var axis = depth % k;

	if (n <= 0) {
		return null;
	}
	if (n == 1) {
		return new Node(points[0], axis)
	}
	var median = Math.floor(points.length / 2);

	points.sort(function (a, b) {
		return a[axis] - b[axis];
	});

	var left = points.slice(0, median);
	var right = points.slice(median + 1);

	var node = new Node(points[median].slice(0, k), axis);
	node.left = build_kdtree(left, depth + 1);
	node.right = build_kdtree(right, depth + 1);

	return node;
}

function distanceSquared(point1, point2) {
	var distance = 0;
	for (var i = 0; i < k; i++)
		distance += Math.pow((point1[i] - point2[i]), 2);
	return Math.sqrt(distance);
}

function closest_point_brute_force(points, point) {
	var PointCe = points[0];
	var DistanceMin = distanceSquared(points[0], point);
	for (var i = 1; i < points.length; i++) {
		var t = distanceSquared(points[i], point);
		if (DistanceMin > t) {
			PointCe = points[i];
			DistanceMin = t;
		}
	}
	return PointCe;
}

function naive_closest_point(node, point, depth = 0, best = null) {
	if (node != null) {
		var dis = distanceSquared(node.point, point);
		console.log(dis);
		if (best != null && distanceSquared(best, point) < dis) {
			return best;
		}
		else {
			if (node.point[node.axis] > point[node.axis]) {
				return naive_closest_point(node.left, point, depth + 1, node.point);
			}
			else {
				return naive_closest_point(node.right, point, depth + 1, node.point);
			}
		}
	}
	else {
		return best;
	}
}

function closer_point(point, p1, p2) {
	if (p2 == null) {
		return p1;
	}
	var distance = distanceSquared(p1.point, point);
	if (distance < distanceSquared(p2.point, point))
		return p1;
	return p2;
}

function closest_point(node, point, depth = 0) {

	if (node === null)
		return null;
	var axis = depth % k;
	var next_branch = null;
	var opposite_branch = null;
	if (point[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}
	var best = closer_point(point, node, closest_point(next_branch, point, depth + 1));
	if (distanceSquared(point, best.point) > Math.abs(point[axis] - node.point[axis])) {
		best = closer_point(point, best, closest_point(opposite_branch, point, depth + 1));
	}

	return best;
}

// Implementacion KNN
function nearest (point, maxNodes, maxDistance) {
	var i,
		result,
		bestNodes;

	bestNodes = new BinaryHeap(
		function (e) { return -e[1]; }
	);

	function nearestSearch(node) {
		var bestChild,
			dimension = dimensions[node.dimension],
			ownDistance = metric(point, node.obj),
			linearPoint = {},
			linearDistance,
			otherChild,
			i;

		function saveNode(node, distance) {
			bestNodes.push([node, distance]);
			if (bestNodes.size() > maxNodes) {
				bestNodes.pop();
			}
		}

		for (i = 0; i < dimensions.length; i += 1) {
			if (i === node.dimension) {
				linearPoint[dimensions[i]] = point[dimensions[i]];
			} else {
				linearPoint[dimensions[i]] = node.obj[dimensions[i]];
			}
		}

		linearDistance = metric(linearPoint, node.obj);

		if (node.right === null && node.left === null) {
			if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
				saveNode(node, ownDistance);
			}
			return;
		}

		if (node.right === null) {
			bestChild = node.left;
		} else if (node.left === null) {
			bestChild = node.right;
		} else {
			if (point[dimension] < node.obj[dimension]) {
				bestChild = node.left;
			} else {
				bestChild = node.right;
			}
		}

		nearestSearch(bestChild);

		if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
			saveNode(node, ownDistance);
		}

		if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
			if (bestChild === node.left) {
				otherChild = node.right;
			} else {
				otherChild = node.left;
			}
			if (otherChild !== null) {
				nearestSearch(otherChild);
			}
		}
	}

	if (maxDistance) {
		for (i = 0; i < maxNodes; i += 1) {
			bestNodes.push([null, maxDistance]);
		}
	}

	if (self.root)
		nearestSearch(self.root);

	result = [];

	for (i = 0; i < Math.min(maxNodes, bestNodes.content.length); i += 1) {
		if (bestNodes.content[i][0]) {
			result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
		}
	}
	return result;
}

