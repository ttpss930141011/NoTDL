import {mount} from '@vue/test-utils';
import {expect, test} from 'vitest';
import ReactiveCounter from '../src/components/ReactiveCounter.vue';
import vuetify from '../vuetify-plugin';

global.ResizeObserver = require('resize-observer-polyfill');

test('ReactiveHash component', async () => {
  expect(ReactiveCounter).toBeTruthy();
  const wrapper = mount(ReactiveCounter, {global: {plugins: [vuetify]}});

  const button = wrapper.get('button');

  expect(button.text()).toBe('count is: 0');
  await button.trigger('click');
  expect(button.text()).toBe('count is: 1');
});
