import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ResultsList from '../src/search-results/ResultsList.jsx'

const results = [
	{ 
		id: 'abc123',
		thumbnailUrl: 'http://placekitten.com/200/150',
		recordUrl: '#',
		data: {
			'Title': 'A book about cats',
			'Author': 'Cat, Not A.',
			'Subject': ['Cats', 'Kittens', 'Pets'],
			'IsPartOf': ['Good Books Collection', 'General Collection']
		},
	},
	{
		id: 'def456',
		recordUrl: '#',
		thumbnailUrl: 'http://placekitten.com/200/145',
		data: {
			'Title': 'Socks the Cat',
			'Author': 'Cleary, Beverly',
			'Subject': ['Cats', 'Pets'],
			'IsPartOf': ['Juvenile Collection']
		},
	},
	{
		id: 'ghi789',
		recordUrl: '#',
		thumbnailUrl: 'http://placekitten.com/200/147',
		data: {
			'Title': 'Top Cat: An Unauthorized Biography',
			'Author': 'Dibble, Officer',
			'Subject': ['Cats', 'True Crime'],
			'IsPartOf': ['General Collection']
		},
	},
	{
		id: 'jkl123',
		recordUrl: '#',
		thumbnailUrl: 'http://placekitten.com/147/200',
		data: {
			'Title': 'I Was "That Darn Cat": a Life',
			'Author': 'McTabberson, Tabby',
			'Subject': ['Cats', 'Celebrities', 'Film'],
			'IsPartOf': ['General Collection'],
		},
	},
	{
		id: 'mno456',
		recordUrl: '#',
		thumbnailUrl: 'http://placekitten.com/300/150',
		data: {
			'Title': 'Famous Cats: Jonesy from "Alien"',
			'Author': 'Author, Cat',
			'Subject': ['Cats', 'Celebrities', 'Film'],
			'IsPartOf': ['General Collection'],
		},
	}
]

storiesOf('search-results/ResultsList', module)
	.add('results list w/ limit of 3', function () {
		return <ResultsList items={results} limit={3} />
	})
	.add('results w/ offset at index 3', function () {
		return <ResultsList items={results} limit={3} offset={3}/>
	})
