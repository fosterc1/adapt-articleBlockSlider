# Release Notes - Version 4.3.8

**Release Date:** November 25, 2025  
**Release Type:** Critical Hotfix  
**Status:** Stable Release ✅

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

### Root Cause (v4.3.7 Bug)
The `delegateEvents()` override introduced in v4.3.7 was fundamentally incompatible with Backbone's event system. Manual attachment of native event listeners with `.bind(this)` broke ALL event handlers, making the plugin completely non-functional.

### Solution
- Removed the problematic `delegateEvents()` override
- All events now handled through Backbone's standard event delegation
- Touch improvements from v4.3.7 are retained and functional
- Plugin now works correctly with jQuery event system

---

## 🎯 Touch Button Improvements (Retained from v4.3.7)

Version 4.3.8 **retains all the intended improvements** from v4.3.7 while fixing the critical bug:

### What's Improved
- ✅ **Reliable Button Taps**: Navigation buttons (arrows/tabs) now respond reliably on touch devices
- ✅ **Tap vs Swipe Detection**: 10px movement threshold distinguishes taps from swipes
- ✅ **No Accidental Activation**: Prevents button activation while swiping through slides
- ✅ **Touch Gesture Support**: Swipe gestures on content area work normally

### How It Works
- `touchstart` tracks initial touch position on buttons
- `touchmove` monitors if finger moves during touch
- `touchend` only triggers button action if movement < 10px (true tap)
- Touch events handled through Backbone/jQuery (stable and reliable)

---

## 📦 Installation

### Adapt Authoring Tool

1. **Download** the v4.3.8 release ZIP from [GitHub Releases](https://github.com/fosterc1/adapt-articleBlockSlider/releases/tag/v4.3.8)
2. Navigate to **Plugin Management** in your AAT instance
3. **Upload** the plugin ZIP file
4. **Enable** the plugin for your courses

### Adapt Framework

Using the Adapt CLI:

```bash
adapt install adapt-articleBlockSlider
```

Or manually:

```bash
cd src/extensions
git clone https://github.com/fosterc1/adapt-articleBlockSlider.git
rm -rf adapt-articleBlockSlider/.git
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
- ✅ Function correctly with RTL languages
- ✅ Respond to orientation changes properly

---

## 📋 Version Comparison

| Version | Status | Notes |
|---------|--------|-------|
| **4.3.8** | ✅ **Stable** | Current release - fully functional with touch improvements |
| 4.3.7 | ⛔ **BROKEN** | DO NOT USE - causes TypeError and text not displaying |
| 4.3.6 | ✅ Stable | Previous stable release (no touch button improvements) |
| 4.3.5 | ✅ Stable | Older stable release |

---

## 🔄 Upgrade Path

### From v4.3.7 (CRITICAL)
**Action Required:** Delete v4.3.7 and install v4.3.8 immediately.

1. Remove v4.3.7 from Plugin Management in AAT
2. Download and install v4.3.8 from releases
3. Re-publish affected courses

### From v4.3.6 or Earlier
**Recommended:** Upgrade to v4.3.8 for touch button improvements.

1. Download v4.3.8 from releases
2. Install/upload to your AAT instance
3. Test in your courses (backward compatible)

---

## 🐛 Known Issues

None at this time. If you encounter any issues, please [report them on GitHub](https://github.com/fosterc1/adapt-articleBlockSlider/issues).

---

## 📝 Full Changelog

See [CHANGELOG.md](CHANGELOG.md) for complete version history.

### v4.3.8 Summary
```
Fixed:
- CRITICAL: TypeError crash (n.apply is not a function)
- CRITICAL: Text not displaying in compiled courses
- CRITICAL: Plugin non-functional in AAT
- Touch button reliability on mobile devices (retained from v4.3.7)

Changed:
- Removed delegateEvents() override
- All events handled via Backbone standard delegation
- Touch improvements use jQuery event system

Technical:
- Simplified event handling architecture
- Improved compatibility with Backbone framework
- Better integration with Adapt event system
```

---

## 🙏 Acknowledgments

Thank you to the community for reporting the v4.3.7 issue quickly, allowing for rapid resolution with this hotfix release.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/fosterc1/adapt-articleBlockSlider/issues)
- **Documentation**: [README.md](README.md)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)
- **Community**: [Adapt Learning Community](https://community.adaptlearning.org/)

---

## 📄 License

GNU General Public License v3.0 - See [LICENSE](LICENSE) for details.

---

**Made with ❤️ for the Adapt Learning Community**
