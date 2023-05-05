import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";

function LineMaker({ data, animate }) {
  const building1 = data.buildings.building1.equipments;
  const links = [[], [], [], []];
  const [linkState, setLinks] = useState([]);
  const lines = [[], []];

  const calculatePoint = (p1, p2, rad) => {
    const circleToBox = new THREE.Vector3().subVectors(
      new THREE.Vector3(...p1),
      new THREE.Vector3(...p2)
    );

    const closestPointOnCircle = new THREE.Vector3().addVectors(
      new THREE.Vector3(...p1),
      circleToBox.normalize().multiplyScalar(-rad)
    );

    return [
      closestPointOnCircle.x,
      closestPointOnCircle.y,
      closestPointOnCircle.z,
    ];
    // console.log(closestPoint);
  };
  useFrame(() => {
    if (!animate) return;
    // console.log(building1["equipment1"].position);
    let i = 0;
    Object.entries(building1).map((x) => {
      x[1].links.map((y) => {
        // console.log(
        //   calculatePoint(building1[y].position, building1[x[1].id].position, 1)
        // );
        // console.log(building1[y].position, building1[x[1].id]);
        links[i][0] = x[1].id + ":" + y;
        links[i][1] = calculatePoint(
          building1[y].position,
          building1[x[1].id].position,
          1
        );
        i++;
      });
      setLinks(links);

      // i++;
    });
  });
  //   useEffect(() => {
  //     console.log(linkState);
  //   }, [links]);
  //   const arr = data.buildings?.building1?.links;

  //   const [closestPoint, setClosestPoint] = useState([0, 0, 0]);

  return (
    <>
      {/* {console.log(links)} */}
      {linkState[0] && (
        <QuadraticBezierLine
          start={linkState[2][1]}
          end={linkState[0][1]}
          color="white"
          lineWidth={2}
          segments
          dashed={false}
          vertexColors={[
            [1, 1, 1],
            [1, 1, 1],
          ]}
        />
      )}
      {linkState[0] && (
        <QuadraticBezierLine
          start={linkState[1][1]}
          end={linkState[3][1]}
          color="white"
          lineWidth={2}
          segments
          dashed={false}
          vertexColors={[
            [1, 1, 1],
            [1, 1, 1],
          ]}
        />
      )}
      {/* {arr.map((elem, i) => {
        const pos1 = data.buildings.building1.equipments[elem[0]].position;
        const pos2 = data.buildings.building1.equipments[elem[1]].position;
        // console.log([Math.cos(pos1[0]), 0, Math.sin(pos1[2])]);
        // console.log(elem + ":" + [Math.cos(pos2[0]), 0, Math.sin(pos2[2])]);
        return (
          <QuadraticBezierLine
            key={i}
            start={i === 0 ? closestPoint : pos1}
            end={pos2}
            color="white"
            lineWidth={2}
            segments
            dashed={false}
            vertexColors={[
              [1, 1, 1],
              [1, 1, 1],
            ]}
          />
        );
      })} */}
    </>
  );
}

export default LineMaker;
