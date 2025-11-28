/**
 * MCP Figma Integration Example
 * Generated from Figma design
 */

import React from 'react'
import { Avatar, Button } from '@dnb/eufemia/src'

// Image assets from Figma
const ainoLogo = 'http://localhost:3845/assets/e42696c4c217843a3cb9bbcb71d0b18d8e496afc.svg'
const minimizeIcon = 'http://localhost:3845/assets/f3fc6c3ecc2436da1e1e2bbb0c443f108740bded.svg'
const closeIcon = 'http://localhost:3845/assets/970e8341c1a17a6fff2abb7426145c2b2273f8be.svg'

const MCPExamplePage = () => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '261px',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: '39px 33px',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Top content section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%',
          minHeight: '1px',
          minWidth: '1px',
        }}
      >
        {/* Left section with headline, text, and button */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '17px',
            alignItems: 'flex-start',
            width: '155px',
          }}
        >
          <h1
            style={{
              fontFamily: 'DNB, sans-serif',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '24px',
              color: '#333333',
              margin: 0,
              width: '100%',
            }}
          >
            Headline
          </h1>

          <p
            style={{
              fontFamily: 'DNB, sans-serif',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '24px',
              color: '#737373',
              margin: 0,
              width: '100%',
            }}
          >
            This is example text
          </p>

          <Button
            icon_position="right"
            text="Button text"
            variant="primary"
            size="default"
          />
        </div>

        {/* Avatar on the right */}
        <Avatar size="small">A</Avatar>
      </div>

      {/* Chat popup */}
      <div
        style={{
          backgroundColor: 'white',
          border: '0.5px solid #ebebeb',
          borderRadius: '8px',
          height: '660px',
          width: '368px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Navbar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '64px',
            backgroundColor: '#007272',
          }}
        >
          {/* Aino logo */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '30.118px',
              height: '32px',
            }}
          >
            <img
              alt="Aino logo"
              style={{ width: '100%', height: '100%', display: 'block' }}
              src={ainoLogo}
            />
          </div>

          {/* Minimize button */}
          <div
            style={{
              position: 'absolute',
              left: '16px',
              top: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 0',
            }}
          >
            <div style={{ position: 'relative', width: '16px', height: '16px' }}>
              <img
                alt="minimize"
                style={{ width: '100%', height: '100%', display: 'block' }}
                src={minimizeIcon}
              />
            </div>
            <p
              style={{
                fontFamily: 'DNB, sans-serif',
                fontSize: '14px',
                lineHeight: '18px',
                color: 'white',
                margin: 0,
                whiteSpace: 'pre',
              }}
            >
              Minimer
            </p>
          </div>

          {/* Close button */}
          <div
            style={{
              position: 'absolute',
              left: '323px',
              top: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 0',
            }}
          >
            <div style={{ position: 'relative', width: '16px', height: '16px' }}>
              <img
                alt="close"
                style={{ width: '100%', height: '100%', display: 'block' }}
                src={closeIcon}
              />
            </div>
            <p
              style={{
                fontFamily: 'DNB, sans-serif',
                fontSize: '14px',
                lineHeight: '18px',
                color: 'white',
                margin: 0,
                whiteSpace: 'pre',
              }}
            >
              Lukk
            </p>
          </div>
        </div>

        {/* Toolbar at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            padding: '16px',
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-end',
            boxShadow: '0px 0.5px 0px 0px #ebebeb, 0px 1px 6px 0px rgba(0,0,0,0.16)',
          }}
        >
          {/* Text input */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                position: 'relative',
                width: '239px',
                height: '100%',
              }}
            >
              <input
                type="text"
                placeholder="Skriv her..."
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  border: '1px solid #007272',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  fontFamily: 'DNB, sans-serif',
                  fontSize: '18px',
                  lineHeight: '24px',
                  color: '#737373',
                }}
              />
            </div>
          </div>

          {/* Send button */}
          <div
            style={{
              backgroundColor: '#007272',
              display: 'flex',
              alignItems: 'center',
              padding: '8px 24px',
              borderRadius: '24px',
            }}
          >
            <p
              style={{
                fontFamily: 'DNB, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '24px',
                color: '#ffffff',
                margin: 0,
                whiteSpace: 'pre',
              }}
            >
              Send
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MCPExamplePage
