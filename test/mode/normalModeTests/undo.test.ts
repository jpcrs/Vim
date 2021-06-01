import { Configuration } from '../../testConfiguration';
import { newTest, newTestSkip } from '../../testSimplifier';
import { setupWorkspace } from '../../testUtils';

suite('Undo', () => {
  setup(async () => {
    await setupWorkspace(new Configuration());
  });

  suite('u', () => {
    newTest({
      title: 'Undo 1',
      start: ['|'],
      keysPressed: 'iabc<Esc>adef<Esc>uu',
      end: ['|'],
    });

    newTest({
      title: 'Undo 2',
      start: ['|'],
      keysPressed: 'iabc<Esc>adef<Esc>u',
      end: ['ab|c'],
    });

    newTest({
      title: 'Undo cursor',
      start: ['|'],
      keysPressed: 'Iabc<Esc>Idef<Esc>Ighi<Esc>uuu',
      end: ['|'],
    });

    newTest({
      title: 'Undo cursor 2',
      start: ['|'],
      keysPressed: 'Iabc<Esc>Idef<Esc>Ighi<Esc>uu',
      end: ['|abc'],
    });

    newTest({
      title: 'Undo cursor 3',
      start: ['|'],
      keysPressed: 'Iabc<Esc>Idef<Esc>Ighi<Esc>u',
      end: ['|defabc'],
    });

    newTest({
      title: 'Undo with movement first',
      start: ['|'],
      keysPressed: 'iabc<Esc>adef<Esc>hlhlu',
      end: ['ab|c'],
    });

    newTest({
      title: "Can handle 'u' after :s/abc/def",
      start: ['Xa|bcX'],
      keysPressed: ':s/abc/def/\nu',
      // TODO: Cursor position is wrong
      end: ['Xa|bcX'],
    });

    newTest({
      title: "Can handle 'u' after :s/abc/def twice",
      start: ['Xa|bcX', 'YabcY', 'ZabcZ'],
      keysPressed: ':s/abc/def/\n' + 'j' + ':s/abc/def/\n' + 'u',
      end: ['XdefX', '|YabcY', 'ZabcZ'],
    });

    newTest({
      title: 'Can handle undo delete',
      start: ['one |two three four five'],
      keysPressed: 'dwdwu',
      end: ['one |three four five'],
    });

    newTest({
      title: 'Can handle undo delete twice',
      start: ['one |two three four five'],
      keysPressed: 'dwdwuu',
      end: ['one |two three four five'],
    });

    newTest({
      title: 'Can handle undo delete with count',
      start: ['one |two three four five'],
      keysPressed: 'dwdw2u',
      end: ['one |two three four five'],
    });

    newTest({
      title: 'Undo Visual delete',
      start: ['one |two three four five'],
      keysPressed: 'vww' + 'd' + 'u',
      end: ['one |two three four five'],
    });

    newTest({
      title: 'Undo VisualBlock delete',
      start: ['one two', 'th|ree four', 'five six', 'seven eight'],
      keysPressed: '<C-v>jll' + 'd' + 'u',
      end: ['one two', 'th|ree four', 'five six', 'seven eight'],
    });
  });

  suite('U', () => {
    newTest({
      title: "Can handle 'U'",
      start: ['|'],
      keysPressed: 'iabc<Esc>U',
      end: ['|'],
    });

    newTest({
      title: "Can handle 'U' for multiple changes",
      start: ['|'],
      keysPressed: 'idef<Esc>aghi<Esc>U',
      end: ['|'],
    });

    newTest({
      title: "Can handle 'U' for new line below",
      start: ['|'],
      keysPressed: 'iabc<Esc>odef<Esc>U',
      end: ['abc', '|'],
    });

    newTestSkip({
      title: "Can handle 'U' for new line above",
      start: ['|'],
      keysPressed: 'iabc<Esc>Odef<Esc>U',
      end: ['|', 'abc'],
    });

    newTest({
      title: "Can handle 'U' for consecutive changes only",
      start: ['|'],
      keysPressed: 'iabc<Esc>odef<Esc>kAghi<Esc>U',
      end: ['ab|c', 'def'],
    });

    newTest({
      title: "Can handle 'u' to undo 'U'",
      start: ['|'],
      keysPressed: 'iabc<Esc>Uu',
      end: ['|abc'],
    });

    newTest({
      title: "Can handle 'U' to undo 'U'",
      start: ['|'],
      keysPressed: 'iabc<Esc>UU',
      end: ['|abc'],
    });
  });

  suite('Redo', () => {
    newTest({
      title: 'Can handle undo delete with count and redo',
      start: ['one |two three four five'],
      keysPressed: 'dwdw2u<C-r>',
      end: ['one |three four five'],
    });

    newTest({
      title: 'Redo',
      start: ['|'],
      keysPressed: 'iabc<Esc>adef<Esc>uu<C-r>',
      end: ['|abc'],
    });

    newTest({
      title: 'Redo',
      start: ['|'],
      keysPressed: 'iabc<Esc>adef<Esc>uu<C-r><C-r>',
      end: ['abc|def'],
    });

    newTest({
      title: 'Redo',
      start: ['|'],
      keysPressed: 'iabc<Esc>adef<Esc>uuhlhl<C-r><C-r>',
      end: ['abc|def'],
    });
  });
});
