# Football App — API Reference

A developer-facing reference for every function, event, animation hook, and configuration constant exposed by the football animation app.

---

## Table of Contents

1. [Overview](#overview)
2. [DOM Structure](#dom-structure)
3. [JavaScript API](#javascript-api)
   - [initFootball()](#initfootball)
   - [kickFootball()](#kickfootball)
   - [resetFootball()](#resetfootball)
   - [setIdleState()](#setidlestate)
4. [Event API](#event-api)
   - [click — Kick Trigger](#click--kick-trigger)
5. [Animation State Lifecycle](#animation-state-lifecycle)
   - [State: idle](#state-idle)
   - [State: kicked](#state-kicked)
   - [State: resetting](#state-resetting)
   - [State Transition Table](#state-transition-table)
6. [CSS Animation Interface](#css-animation-interface)
   - [footballKickAcross Keyframe](#footballkickacross-keyframe)
   - [idleBounce Keyframe](#idlebounce-keyframe)
   - [idleSway Keyframe](#idlesway-keyframe)
7. [Configuration Reference](#configuration-reference)
   - [JavaScript Constants](#javascript-constants)
   - [CSS Custom Properties](#css-custom-properties)
8. [Request / Response Examples](#request--response-examples)
   - [Example 1: First Kick](#example-1-first-kick)
   - [Example 2: Kick While Resetting (Ignored)](#example-2-kick-while-resetting-ignored)
   - [Example 3: Snap-Back Reset](#example-3-snap-back-reset)
9. [Error States & Edge Cases](#error-states--edge-cases)

---

## Overview

The football app is a single-page browser application that renders an animated football fixed to the bottom-left corner of the viewport. The app exposes a lightweight event-driven API built entirely on native browser events, CSS keyframe animations, and vanilla JavaScript DOM manipulation.

**Core interaction loop:**
