/*******************************************************************************
 * Copyright (c) 2000, 2008 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.swt.events;


import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.graphics.GC;

/**
 * Instances of this class are sent as a result of
 * visible areas of controls requiring re-painting.
 *
 * @see PaintListener
 * @see <a href="http://www.eclipse.org/swt/">Sample code and further information</a>
 */
// RAP [bm]: e4-enabling hacks
public final class PaintEvent extends TypedEvent {
	
	/**
	 * the graphics context to use when painting
	 * that is configured to use the colors, font and
	 * damaged region of the control.  It is valid
	 * only during the paint and must not be disposed
	 */
	public GC gc;
	
	/**
	 * the x offset of the bounding rectangle of the 
	 * region that requires painting
	 */
	public int x;
	
	/**
	 * the y offset of the bounding rectangle of the 
	 * region that requires painting
	 */
	public int y;
	
	/**
	 * the width of the bounding rectangle of the 
	 * region that requires painting
	 */
	public int width;
	
	/**
	 * the height of the bounding rectangle of the 
	 * region that requires painting
	 */
	public int height;

	/**
	 * the number of following paint events which
     * are pending which may always be zero on
	 * some platforms
	 */
	public int count;

	static final long serialVersionUID = 3256446919205992497L;
	
/**
 * Constructs a new instance of this class based on the
 * information in the given untyped event.
 *
 * @param e the untyped event containing the information
 */
public PaintEvent(Event e) {
  super(e.widget, e.type);
//	super(e);
	this.gc = e.gc;
	this.x = e.x;
	this.y = e.y;
	this.width = e.width;
	this.height = e.height;
	this.count = e.count;
}

/**
 * Returns a string containing a concise, human-readable
 * description of the receiver.
 *
 * @return a string representation of the event
 */
public String toString() {
	String string = super.toString ();
	return string.substring (0, string.length() - 1) // remove trailing '}'
		+ " gc=" + gc
		+ " x=" + x
		+ " y=" + y
		+ " width=" + width
		+ " height=" + height
		+ " count=" + count
		+ "}";
}
}

