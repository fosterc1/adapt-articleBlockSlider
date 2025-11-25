# How to Create GitHub Release for v4.3.8

## Step-by-Step Instructions

### 1. Navigate to GitHub Releases Page
Go to: https://github.com/fosterc1/adapt-article-blockslider/releases

### 2. Click "Draft a new release"

### 3. Fill in Release Information

**Choose a tag:** Select `v4.3.8` (already created and pushed)

**Release title:** 
```
v4.3.8 - Critical Hotfix (Touch Button Improvements)
```

**Description:** Copy and paste the content below:

---

## 🚨 CRITICAL NOTICE

**Version 4.3.7 is completely broken and should not be used.**

If you installed v4.3.7, please update to v4.3.8 immediately. Version 4.3.7 causes:
- ❌ `Uncaught TypeError: n.apply is not a function`
- ❌ Text not displaying in compiled courses
- ❌ Plugin completely non-functional in Adapt Authoring Tool

---

## ✅ What's Fixed in v4.3.8

### Critical Bug Fixes
- **Fixed TypeError crash**: Resolved "Uncaught TypeError: n.apply is not a function" in Backbone
- **Fixed text rendering**: Text now displays correctly in compiled courses
- **Restored AAT functionality**: Plugin works properly in Adapt Authoring Tool
- **Fixed event handling**: All navigation and interaction events work correctly

### Root Cause
The `delegateEvents()` override introduced in v4.3.7 was fundamentally incompatible with Backbone's event system. This has been completely removed and the plugin now uses standard Backbone event delegation.

---

## 🎯 Touch Button Improvements (Retained from v4.3.7)

Version 4.3.8 **retains all the intended improvements** from v4.3.7 while fixing the critical bug:

- ✅ **Reliable Button Taps**: Navigation buttons (arrows/tabs) now respond reliably on touch devices
- ✅ **Tap vs Swipe Detection**: 10px movement threshold distinguishes taps from swipes
- ✅ **No Accidental Activation**: Prevents button activation while swiping through slides
- ✅ **Touch Gesture Support**: Swipe gestures on content area work normally

---

## 📦 Installation

### Adapt Authoring Tool

1. Download the ZIP file from this release
2. Navigate to **Plugin Management** in your AAT instance
3. Upload the plugin ZIP file
4. Enable the plugin for your courses

### Adapt Framework

Using the Adapt CLI:
```bash
adapt install adapt-articleBlockSlider
```

---

## 🧪 Testing Performed

Version 4.3.8 has been tested and verified to:

- ✅ Display text correctly in compiled courses
- ✅ Load without console errors
- ✅ Work properly in Adapt Authoring Tool
- ✅ Handle button clicks reliably on desktop
- ✅ Handle button taps reliably on touch devices (iOS/Android)
- ✅ Support swipe gestures on mobile/tablet
- ✅ Maintain WCAG 2.1 AA accessibility compliance

---

## 📋 Version Comparison

| Version | Status | Notes |
|---------|--------|-------|
| **4.3.8** | ✅ **Stable** | Current release - fully functional with touch improvements |
| 4.3.7 | ⛔ **BROKEN** | DO NOT USE - causes TypeError and text not displaying |
| 4.3.6 | ✅ Stable | Previous stable release (no touch button improvements) |

---

## 🔄 Upgrade Path

### From v4.3.7 (CRITICAL)
**Action Required:** Delete v4.3.7 and install v4.3.8 immediately.

1. Remove v4.3.7 from Plugin Management in AAT
2. Download and install v4.3.8 from this release
3. Re-publish affected courses

### From v4.3.6 or Earlier
**Recommended:** Upgrade to v4.3.8 for touch button improvements.

---

## 📝 Changelog

**Fixed:**
- CRITICAL: TypeError crash (n.apply is not a function)
- CRITICAL: Text not displaying in compiled courses
- CRITICAL: Plugin non-functional in AAT
- Touch button reliability on mobile devices (retained from v4.3.7)

**Changed:**
- Removed delegateEvents() override
- All events handled via Backbone standard delegation
- Touch improvements use jQuery event system

**Technical:**
- Simplified event handling architecture
- Improved compatibility with Backbone framework
- Better integration with Adapt event system

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/fosterc1/adapt-articleBlockSlider/issues)
- **Documentation**: [README.md](https://github.com/fosterc1/adapt-articleBlockSlider/blob/master/README.md)
- **Full Changelog**: [CHANGELOG.md](https://github.com/fosterc1/adapt-articleBlockSlider/blob/master/CHANGELOG.md)

---

**Made with ❤️ for the Adapt Learning Community**

---

### 4. Mark as Pre-release
- [ ] **Do NOT check** "Set as a pre-release" (this is a stable release)

### 5. Mark as Latest Release
- [x] **Check** "Set as the latest release"

### 6. Attach Plugin ZIP File

You need to create and attach a ZIP file of the plugin. Here's how:

#### Option A: Create ZIP from GitHub (Recommended)

1. GitHub will automatically create source code archives (ZIP and tar.gz)
2. These will be attached automatically when you publish the release

#### Option B: Create Custom Plugin ZIP (For AAT Installation)

Create a ZIP file that includes only the necessary plugin files:

**Include these files/folders:**
- `/js/` (all JavaScript files)
- `/less/` (all LESS/CSS files)
- `/templates/` (all Handlebars templates)
- `bower.json`
- `package.json`
- `properties.schema`
- `example.json`
- `README.md`
- `CHANGELOG.md`
- `LICENSE`

**Exclude these:**
- `.git/` folder
- `.gitignore`
- `node_modules/` (if present)
- `GITHUB_RELEASE_INSTRUCTIONS.md`
- `RELEASE_NOTES_4.3.8.md`
- Any development files

Name the ZIP: `adapt-article-blockslider-v4.3.8.zip`

### 7. Publish Release

Click the **"Publish release"** button

---

## After Publishing

1. Verify the release appears at: https://github.com/fosterc1/adapt-article-blockslider/releases
2. Verify v4.3.8 is marked as "Latest"
3. Test downloading the ZIP file
4. Consider announcing the release to the Adapt Learning Community

---

## Notes

- The git tag `v4.3.8` has already been created and pushed
- All documentation (README, CHANGELOG, RELEASE_NOTES) has been updated
- Version numbers in bower.json and package.json are already set to 4.3.8
- All commits have been pushed to the master branch
