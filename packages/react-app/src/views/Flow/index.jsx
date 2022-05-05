import React, { useState, useCallback } from 'react'
import ReactFlow, { addEdge, MiniMap, Controls, Background, useNodesState, useEdgesState } from 'react-flow-renderer'
import { utils } from 'ethers'

import { initialNodes } from './initialNodes'
import { initialEdges } from './initialEdges'
import { Address, Balance, Events } from '../../components'
import './flow.css'

const onInit = reactFlowInstance => console.log('flow loaded:', reactFlowInstance)

export default function ExampleUI({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const onConnect = params => setEdges(eds => addEdge(params, eds))

  return (
    <div className="font-normal text-gray-900 dark:text-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView // Fits the view to the nodes on the pane
        attributionPosition="top-right"
        style={
          {
            /*
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          */
          }
        }
      >
        <MiniMap
          nodeStrokeColor={n => {
            if (n.style?.background) return n.style.background
            if (n.type === 'input') return '#0041d0'
            if (n.type === 'output') return '#ff0072'
            if (n.type === 'default') return '#1a192b'

            return '#eee'
          }}
          nodeColor={n => {
            if (n.style?.background) return n.style.background
            return '#fff'
          }}
          nodeBorderRadius={2}
          style={{ top: '10%' }}
        />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  )
}
