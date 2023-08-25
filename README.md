# Running calculator

Time, distance and pace calculator made in SvelteKit that updates the calculation in real-time. Easy to use with all the expected functionality:

- KM / MI toggle for distance and pace,
- button shortcuts for frequently used distances,
- support for custom pace (custom seconds per custom meters),
- 100, 200 and 400 m splits,
- split times printout at custom number of kilometers, miles, meters or yards,
- theme switch,
- reset button.

After not updating any of the fields for 5s all the data gets saved to browser's local storage.

No tracking, no analytics, no cookies.

### Develop locally

```bash
git clone https://github.com/banDeveloper/running-calculator
cd running-calculator
npm install

# run dev server
npm run dev

# build
npm run format
npm run lint
npm run check
npm run build

# preview build locally
npm run preview
```
